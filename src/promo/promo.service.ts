import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ActivatePromoDto } from './dto/activate-promo.dto';

@Injectable()
export class PromoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePromoDto) {
    return this.prisma.promo.create({
      data: {
        code: dto.code,
        discount: dto.discount,
        limit: dto.limit,
        expiresAt: new Date(dto.expiresAt),
      },
    });
  }

  async findAll() {
    return this.prisma.promo.findMany();
  }

  async findOne(id: number) {
    const promo = await this.prisma.promo.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Промокод не найден');
    return promo;
  }

  async activate(code: string, dto: ActivatePromoDto) {
    const promo = await this.prisma.promo.findUnique({ where: { code } });

    if (!promo) throw new NotFoundException('Промокод не найден');

    if (promo.expiresAt < new Date()) {
      throw new BadRequestException('Промокод истёк');
    }

    const activationsCount = await this.prisma.activation.count({
      where: { promoId: promo.id },
    });

    if (activationsCount >= promo.limit) {
      throw new BadRequestException('Превышен лимит активаций');
    }

    const existing = await this.prisma.activation.findUnique({
      where: { email_promoId: { email: dto.email, promoId: promo.id } },
    });

    if (existing) {
      throw new BadRequestException('Этот email уже активировал данный промокод');
    }

    return this.prisma.activation.create({
      data: { email: dto.email, promoId: promo.id },
    });
  }
}

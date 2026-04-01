import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PromoService {
  constructor(private readonly prisma: PrismaService) {}
}

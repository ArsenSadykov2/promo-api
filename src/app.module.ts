import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [PromoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

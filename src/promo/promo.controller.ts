import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ActivatePromoDto } from './dto/activate-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.create(dto);
  }

  @Get()
  findAll() {
    return this.promoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoService.findOne(Number(id));
  }

  @Post(':code/activate')
  activate(@Param('code') code: string, @Body() dto: ActivatePromoDto) {
    return this.promoService.activate(code, dto);
  }
}

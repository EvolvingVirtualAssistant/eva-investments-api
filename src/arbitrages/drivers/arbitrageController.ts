import { Controller, Get, Res } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Response } from 'express';
import { ArbitrageService } from '../domain/services/arbitrageService';

@Controller('arbitrages')
export class ArbitrageController {
  constructor(private arbitrageService: ArbitrageService) {}

  @Get()
  getArbitrages(@Res() response: Response, @Query('status') status?: string) {
    response.status(200).json([]);
  }
}

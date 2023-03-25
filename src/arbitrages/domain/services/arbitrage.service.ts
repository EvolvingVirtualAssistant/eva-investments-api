import { Injectable } from '@nestjs/common/decorators/core';
import { ArbitragesStatuses } from '../../drivers/dtos/arbitrages-statuses.dto';
import { ArbitrageDto } from '../../drivers/dtos/arbitrage.dto';

export type GetArbitragesFilter = {
  status?: string;
  account?: string;
  chainId?: number;
  pools?: string[];
  tokens?: string[];
  exchages?: string[];
};

@Injectable()
export class ArbitrageService {
  getArbitrages(filter: GetArbitragesFilter) {
    return [];
  }

  createArbitrage(arbitrageDto: ArbitrageDto) {
    return arbitrageDto;
  }

  updateArbitragesStatuses(arbitragesStatuses: ArbitragesStatuses) {
    return;
  }

  getArbitrage(id: string) {
    return;
  }

  deleteArbitrage(id: string) {
    return;
  }

  updateArbitrage(id: string, arbitrage: any) {
    return;
  }
}

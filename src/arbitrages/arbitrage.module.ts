import { Module } from '@nestjs/common/decorators/modules';
import { ArbitrageService } from './domain/services/arbitrage.service';
import { ArbitrageController } from './drivers/arbitrage.controller';

@Module({
  imports: [],
  controllers: [ArbitrageController],
  providers: [ArbitrageService]
})
export class ArbitrageModule {}

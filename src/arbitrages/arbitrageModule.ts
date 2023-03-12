import { Module } from '@nestjs/common/decorators/modules';
import { ArbitrageService } from './domain/services/arbitrageService';
import { ArbitrageController } from './drivers/arbitrageController';

@Module({
  imports: [],
  controllers: [ArbitrageController],
  providers: [ArbitrageService]
})
export class ArbitrageModule {}

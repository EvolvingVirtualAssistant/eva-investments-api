import { Module } from '@nestjs/common';
import { ArbitrageModule } from './arbitrages/arbitrageModule';

@Module({
  imports: [ArbitrageModule]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ArbitrageModule } from './arbitrages/arbitrage.module';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { AuthGuard } from './utils/guards/auth.guard';

@Module({
  imports: [ArbitrageModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}

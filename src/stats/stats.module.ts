import { Module } from '@nestjs/common';
import { StatisticsService } from './stats.service';
import { StatisticsController } from './stats.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}

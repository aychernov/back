import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IncrementCountryDto } from './dto/create-stat.dto';

@Injectable()
export class StatisticsService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async incrementCountry(dto: IncrementCountryDto): Promise<void> {
    await this.redis.incr(`country:${dto.countryCode.toLowerCase()}`);
  }

  async getAllStatistics(): Promise<Record<string, number>> {
    const keys = await this.redis.keys('country:*');
    const result: Record<string, number> = {};

    if (keys.length === 0) return result;

    const values = await this.redis.mget(...keys);
    keys.forEach((key, index) => {
      const countryCode = key.replace('country:', '');
      result[countryCode] = parseInt(values[index] || '0');
    });

    return result;
  }
}

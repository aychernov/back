import { Controller, Get, Post, Body } from '@nestjs/common';
import { StatisticsService } from './stats.service';
import { IncrementCountryDto } from './dto/create-stat.dto';

@Controller('stats')
export class StatisticsController {
  constructor(private readonly statsService: StatisticsService) {}

  @Post()
  async increment(@Body() dto: IncrementCountryDto) {
    await this.statsService.incrementCountry(dto);
    return {
      message: `Counter for ${dto.countryCode.toUpperCase()} incremented.`,
    };
  }

  @Get()
  async getStats() {
    return this.statsService.getAllStatistics();
  }
}

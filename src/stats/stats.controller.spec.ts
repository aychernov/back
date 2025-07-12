import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './stats.controller';
import { StatisticsService } from './stats.service';
import { IncrementCountryDto } from './dto/create-stat.dto';
import { validate } from 'class-validator';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let service: StatisticsService;

  beforeEach(async () => {
    const mockService = {
      incrementCountry: jest.fn(),
      getAllStatistics: jest.fn().mockResolvedValue({ ru: 1, us: 2 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [{ provide: StatisticsService, useValue: mockService }],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should call incrementCountry', async () => {
    await controller.increment({ countryCode: 'ru' });
    expect(service.incrementCountry).toHaveBeenCalledWith({
      countryCode: 'ru',
    });
  });

  it('should fail validation on invalid country code', async () => {
    const dto = new IncrementCountryDto();
    dto.countryCode = 'russia'; // no-valid

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should return all stats', async () => {
    const stats = await controller.getStats();
    expect(stats).toEqual({ ru: 1, us: 2 });
  });
});

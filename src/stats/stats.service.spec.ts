import { StatisticsService } from './stats.service';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let redisMock: any;

  beforeEach(() => {
    redisMock = {
      incr: jest.fn(),
      keys: jest.fn(),
      mget: jest.fn(),
    };

    service = new StatisticsService(redisMock);
  });

  it('should increment country code', async () => {
    await service.incrementCountry({ countryCode: 'us' });
    expect(redisMock.incr).toHaveBeenCalledWith('country:us');
  });

  it('should return all statistics', async () => {
    redisMock.keys.mockResolvedValue(['country:us', 'country:de']);
    redisMock.mget.mockResolvedValue(['10', '5']);

    const stats = await service.getAllStatistics();
    expect(stats).toEqual({ us: 10, de: 5 });
  });
});

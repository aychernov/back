import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest'), CountryModule],
  imports: [ConfigModule.forRoot({ isGlobal: true }), StatisticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

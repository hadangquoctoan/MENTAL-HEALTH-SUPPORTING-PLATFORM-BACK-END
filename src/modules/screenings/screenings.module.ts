import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningAttempt } from '../../database/entities/screenings/screening_attempt.entity';
import { ScreeningQuestion } from '../../database/entities/screenings/screening_question.entity';
import { ScreeningResult } from '../../database/entities/screenings/screening_result.entity';
import { ScreeningType } from '../../database/entities/screenings/screening_type.entity';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScreeningType,
      ScreeningAttempt,
      ScreeningQuestion,
      ScreeningResult,
    ]),
  ],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  exports: [ScreeningsService],
})
export class ScreeningsModule {}

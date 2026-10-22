import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientAchievement } from '../../database/entities/gamification/patient_achievement.entity';
import { PatientStreak } from '../../database/entities/gamification/patient_streak.entity';
import { StreakLog } from '../../database/entities/gamification/streak_log.entity';
import { StreakMilestone } from '../../database/entities/gamification/streak_milestone.entity';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatientStreak,
      StreakLog,
      StreakMilestone,
      PatientAchievement,
    ]),
  ],
  controllers: [GamificationController],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}

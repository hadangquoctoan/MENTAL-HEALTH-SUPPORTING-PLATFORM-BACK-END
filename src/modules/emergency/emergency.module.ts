import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyAction } from '../../database/entities/emergency/emergency_action.entity';
import { EmergencyEvent } from '../../database/entities/emergency/emergency_event.entity';
import { RiskDetection } from '../../database/entities/emergency/risk_detection.entity';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiskDetection, EmergencyEvent, EmergencyAction]),
  ],
  controllers: [EmergencyController],
  providers: [EmergencyService],
  exports: [EmergencyService],
})
export class EmergencyModule {}

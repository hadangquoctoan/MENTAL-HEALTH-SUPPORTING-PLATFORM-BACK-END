import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { EmergencyEventStatus } from '../../../common/enums';
import { User } from '../users/user.entity';
import { RiskDetection } from './risk_detection.entity';
import { EmergencyAction } from './emergency_action.entity';

@Entity({ name: 'emergency_events' })
@Index('idx_emergency_events_patient_status', ['patientId', 'status'])
export class EmergencyEvent {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_emergency_events_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Column({
    name: 'risk_detection_id',
    type: 'bigint',
  })
  riskDetectionId: string;

  @Index('idx_emergency_events_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: EmergencyEventStatus,
    default: EmergencyEventStatus.TRIGGERED,
  })
  status: EmergencyEventStatus;

  @Index('idx_emergency_events_triggered')
  @Column({
    name: 'triggered_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  triggeredAt: Date;

  @Column({
    name: 'resolved_at',
    type: 'timestamp',
    nullable: true,
  })
  resolvedAt: Date | null;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @ManyToOne(() => RiskDetection, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'risk_detection_id' })
  riskDetection: RiskDetection;

  @OneToMany(() => EmergencyAction, (action) => action.emergencyEvent)
  actions: EmergencyAction[];
}

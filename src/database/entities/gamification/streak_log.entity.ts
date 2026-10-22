import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'streak_logs' })
@Unique('uq_streak_logs_patient_date', ['patientId', 'logDate'])
export class StreakLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_streak_logs_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_streak_logs_date')
  @Column({
    name: 'log_date',
    type: 'date',
  })
  logDate: string;

  @Column({
    name: 'actions_required',
    type: 'int',
  })
  actionsRequired: number;

  @Column({
    name: 'actions_completed',
    type: 'int',
  })
  actionsCompleted: number;

  @Column({
    name: 'is_streak_day',
    type: 'boolean',
    default: false,
  })
  isStreakDay: boolean;

  @Column({
    name: 'streak_count',
    type: 'int',
  })
  streakCount: number;

  @Column({
    name: 'points_earned',
    type: 'int',
    default: 0,
  })
  pointsEarned: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

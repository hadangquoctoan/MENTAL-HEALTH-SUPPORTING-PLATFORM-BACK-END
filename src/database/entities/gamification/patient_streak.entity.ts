import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'patient_streaks' })
export class PatientStreak {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('uq_patient_streaks_patient', { unique: true })
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_patient_streaks_current')
  @Column({
    name: 'current_streak',
    type: 'int',
    default: 0,
  })
  currentStreak: number;

  @Index('idx_patient_streaks_longest')
  @Column({
    name: 'longest_streak',
    type: 'int',
    default: 0,
  })
  longestStreak: number;

  @Column({
    name: 'last_completed_date',
    type: 'date',
    nullable: true,
  })
  lastCompletedDate: string | null;

  @Column({
    name: 'total_completed_days',
    type: 'int',
    default: 0,
  })
  totalCompletedDays: number;

  @Index('idx_patient_streaks_points')
  @Column({
    name: 'total_points',
    type: 'int',
    default: 0,
  })
  totalPoints: number;

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

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

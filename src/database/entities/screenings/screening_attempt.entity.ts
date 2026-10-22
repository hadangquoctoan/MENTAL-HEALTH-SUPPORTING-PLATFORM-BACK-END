import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ScreeningStatus } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'screening_attempts' })
@Index('idx_screening_attempts_patient_status', ['patientId', 'status'])
export class ScreeningAttempt {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_screening_attempts_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_screening_attempts_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: ScreeningStatus,
    default: ScreeningStatus.IN_PROGRESS,
  })
  status: ScreeningStatus;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
  })
  completedAt: Date | null;

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
}

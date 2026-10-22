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
import { User } from '../users/user.entity';
import { ScreeningAttempt } from './screening_attempt.entity';
import { ScreeningType } from './screening_type.entity';

@Entity({ name: 'screening_results' })
@Index('idx_screening_results_composite', [
  'patientId',
  'screeningTypeId',
  'createdAt',
])
export class ScreeningResult {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_screening_results_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_screening_results_attempt')
  @Column({
    name: 'attempt_id',
    type: 'bigint',
  })
  attemptId: string;

  @Index('idx_screening_results_type')
  @Column({
    name: 'screening_type_id',
    type: 'bigint',
  })
  screeningTypeId: string;

  @Column({
    name: 'answers',
    type: 'json',
  })
  answers: Record<string, any>;

  @Column({
    name: 'total_score',
    type: 'int',
    nullable: true,
  })
  totalScore: number | null;

  @Index('idx_screening_results_created')
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

  @ManyToOne(() => ScreeningAttempt, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'attempt_id' })
  attempt: ScreeningAttempt;

  @ManyToOne(() => ScreeningType, (type) => type.results, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'screening_type_id' })
  screeningType: ScreeningType;
}

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
import { StreakMilestone } from './streak_milestone.entity';

@Entity({ name: 'patient_achievements' })
@Unique('uq_patient_milestone', ['patientId', 'milestoneId'])
export class PatientAchievement {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_patient_achievements_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_patient_achievements_milestone')
  @Column({
    name: 'milestone_id',
    type: 'bigint',
  })
  milestoneId: string;

  @CreateDateColumn({
    name: 'achieved_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  achievedAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @ManyToOne(() => StreakMilestone, (milestone) => milestone.achievements, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'milestone_id' })
  milestone: StreakMilestone;
}

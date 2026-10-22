import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { PatientAchievement } from './patient_achievement.entity';

@Entity({ name: 'streak_milestones' })
@Unique('uq_streak_milestones_days', ['streakDays'])
export class StreakMilestone {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({
    name: 'streak_days',
    type: 'int',
  })
  streakDays: number;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'badge_icon',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  badgeIcon: string | null;

  @Column({
    name: 'points',
    type: 'int',
    default: 0,
  })
  points: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => PatientAchievement, (achievement) => achievement.milestone)
  achievements: PatientAchievement[];
}

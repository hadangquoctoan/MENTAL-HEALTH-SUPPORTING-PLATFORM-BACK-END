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
import {
  EmergencyActionResult,
  EmergencyActionType,
} from '../../../common/enums';
import { EmergencyEvent } from './emergency_event.entity';

@Entity({ name: 'emergency_actions' })
export class EmergencyAction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_emergency_actions_event')
  @Column({
    name: 'emergency_event_id',
    type: 'bigint',
  })
  emergencyEventId: string;

  @Column({
    name: 'action_type',
    type: 'enum',
    enum: EmergencyActionType,
  })
  actionType: EmergencyActionType;

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

  @Index('idx_emergency_actions_result')
  @Column({
    name: 'result',
    type: 'enum',
    enum: EmergencyActionResult,
    default: EmergencyActionResult.PENDING,
  })
  result: EmergencyActionResult;

  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string | null;

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

  @ManyToOne(() => EmergencyEvent, (event) => event.actions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'emergency_event_id' })
  emergencyEvent: EmergencyEvent;
}

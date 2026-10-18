import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ActionType } from '../../../common/enums';
import { Plan } from './plan.entity';

@Entity({ name: 'plan_actions' })
export class PlanAction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID kế hoạch chăm sóc/điều trị chứa hành động này */
  @Index('idx_plan_actions_plan')
  @Column({
    name: 'plan_id',
    type: 'bigint',
  })
  planId: string;

  /** Loại hành động: MEDICATION, EXERCISE, SLEEP, JOURNAL, APPOINTMENT, CUSTOM */
  @Index('idx_plan_actions_type')
  @Column({
    name: 'action_type',
    type: 'enum',
    enum: ActionType,
  })
  actionType: ActionType;

  /** Chi tiết nội dung/hướng dẫn của hành động */
  @Column({
    name: 'detail',
    type: 'text',
  })
  detail: string;

  /** Thời điểm cụ thể trong ngày (kiểu time, ví dụ: 08:00:00) mà hành động được lên lịch thực hiện */
  @Column({
    name: 'scheduled_time',
    type: 'time',
    nullable: true,
  })
  scheduledTime: string | null;

  /** Thời điểm tạo hành động */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật hành động gần nhất */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  /** Thời điểm xóa mềm (Soft Delete) */
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

  // ==========================================
  // RELATIONS (CÁC MỐI QUAN HỆ)
  // ==========================================

  /** Kế hoạch điều trị chứa hành động này */
  @ManyToOne(() => Plan, (plan) => plan.actions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;
}

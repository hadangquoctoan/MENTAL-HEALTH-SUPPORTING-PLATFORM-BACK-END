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
import { ActionLogStatus } from '../../../common/enums';
import { User } from '../users/user.entity';
import { PlanAction } from './plan_action.entity';
import { ReminderLog } from './reminder_log.entity';

@Entity({ name: 'action_logs' })
@Index('idx_action_logs_patient_status', ['patientId', 'status'])
@Index('idx_action_logs_action_created', ['actionId', 'createdAt'])
export class ActionLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID hành động trong kế hoạch cần thực hiện */
  @Index('idx_action_logs_action')
  @Column({
    name: 'action_id',
    type: 'bigint',
  })
  actionId: string;

  /** ID của bệnh nhân thực hiện hành động */
  @Index('idx_action_logs_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Thời điểm bệnh nhân hoàn thành hành động */
  @Column({
    name: 'completed_at',
    type: 'timestamp',
    nullable: true,
  })
  completedAt: Date | null;

  /** Trạng thái thực hiện: PENDING, COMPLETED, MISSED, DECLINED */
  @Index('idx_action_logs_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: ActionLogStatus,
    default: ActionLogStatus.PENDING,
  })
  status: ActionLogStatus;

  /** Ghi chú của bệnh nhân khi thực hiện hoặc lý do bỏ lỡ/từ chối */
  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string | null;

  /** Thời điểm tạo bản ghi nhật ký */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật bản ghi gần nhất */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // ==========================================
  // RELATIONS (CÁC MỐI QUAN HỆ)
  // ==========================================

  /** Hành động trong kế hoạch tương ứng */
  @ManyToOne(() => PlanAction, (action) => action.actionLogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'action_id' })
  action: PlanAction;

  /** Bệnh nhân thực hiện hành động */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  /** Danh sách lời nhắc được gửi cho nhật ký hành động này */
  @OneToMany(() => ReminderLog, (reminder) => reminder.actionLog)
  reminderLogs: ReminderLog[];
}

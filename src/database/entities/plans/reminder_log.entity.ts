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
import { ReminderType, ReminderStatus } from '../../../common/enums';
import { User } from '../users/user.entity';
import { ActionLog } from './action_log.entity';

@Entity({ name: 'reminder_logs' })
export class ReminderLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của nhật ký hành động được nhắc nhở */
  @Index('idx_reminder_logs_action_log')
  @Column({
    name: 'action_log_id',
    type: 'bigint',
  })
  actionLogId: string;

  /** ID của bệnh nhân nhận lời nhắc */
  @Index('idx_reminder_logs_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Kênh gửi lời nhắc: ZALO, EMAIL, TELEGRAM, WEB */
  @Column({
    name: 'reminder_type',
    type: 'enum',
    enum: ReminderType,
  })
  reminderType: ReminderType;

  /** Thời điểm dự kiến gửi thông báo nhắc nhở */
  @Index('idx_reminder_logs_scheduled')
  @Column({
    name: 'scheduled_at',
    type: 'timestamp',
  })
  scheduledAt: Date;

  /** Thời điểm thực tế đã gửi thành công thông báo */
  @Column({
    name: 'sent_at',
    type: 'timestamp',
    nullable: true,
  })
  sentAt: Date | null;

  /** Nội dung thông điệp nhắc nhở gửi tới bệnh nhân */
  @Column({
    name: 'message',
    type: 'text',
  })
  message: string;

  /** Trạng thái gửi lời nhắc: PENDING, SENT, FAILED */
  @Index('idx_reminder_logs_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: ReminderStatus,
    default: ReminderStatus.PENDING,
  })
  status: ReminderStatus;

  /** Thời điểm tạo bản ghi nhắc nhở */
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

  /** Nhật ký hành động được lên lịch nhắc nhở */
  @ManyToOne(() => ActionLog, (actionLog) => actionLog.reminderLogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'action_log_id' })
  actionLog: ActionLog;

  /** Bệnh nhân nhận nhắc nhở */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

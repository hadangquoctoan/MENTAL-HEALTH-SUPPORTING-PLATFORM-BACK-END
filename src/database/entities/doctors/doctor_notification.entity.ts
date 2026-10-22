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
import { DoctorNotificationType } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'doctor_notifications' })
@Index('idx_doctor_notifications_composite', [
  'doctorId',
  'isRead',
  'createdAt',
])
export class DoctorNotification {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bác sĩ nhận thông báo */
  @Index('idx_doctor_notifications_doctor')
  @Column({
    name: 'doctor_id',
    type: 'bigint',
  })
  doctorId: string;

  /** ID của bệnh nhân liên quan đến thông báo */
  @Index('idx_doctor_notifications_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Loại thông báo cảnh báo: RISK_ALERT, ADHERENCE_ALERT, MOOD_ALERT, SCREENING_RESULT, PLAN_REMINDER */
  @Column({
    name: 'type',
    type: 'enum',
    enum: DoctorNotificationType,
  })
  type: DoctorNotificationType;

  /** Tiêu đề thông báo */
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  /** Nội dung chi tiết của thông báo */
  @Column({
    name: 'message',
    type: 'text',
  })
  message: string;

  /** Trạng thái đã đọc hay chưa (true: đã đọc, false: chưa đọc) */
  @Index('idx_doctor_notifications_is_read')
  @Column({
    name: 'is_read',
    type: 'boolean',
    default: false,
  })
  isRead: boolean;

  /** Thời điểm bác sĩ đọc thông báo */
  @Column({
    name: 'read_at',
    type: 'timestamp',
    nullable: true,
  })
  readAt: Date | null;

  /** Thời điểm tạo thông báo */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật thông báo gần nhất */
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

  /** Bác sĩ nhận thông báo */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  /** Bệnh nhân liên quan */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

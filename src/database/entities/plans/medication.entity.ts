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
import { User } from '../users/user.entity';

@Entity({ name: 'medications' })
@Index('idx_medications_dates', ['startDate', 'endDate'])
@Index('idx_medications_patient_start', ['patientId', 'startDate'])
export class Medication {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bệnh nhân sử dụng thuốc */
  @Index('idx_medications_patient_id')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Tên loại thuốc điều trị */
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  /** Liều lượng sử dụng (ví dụ: '50mg', '1 viên') */
  @Column({
    name: 'dosage',
    type: 'varchar',
    length: 100,
  })
  dosage: string;

  /** Tần suất sử dụng (ví dụ: '2 lần/ngày sau khi ăn') */
  @Column({
    name: 'frequency',
    type: 'varchar',
    length: 100,
  })
  frequency: string;

  /** Ngày bắt đầu dùng thuốc */
  @Column({
    name: 'start_date',
    type: 'date',
  })
  startDate: string;

  /** Ngày kết thúc đợt thuốc */
  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
  })
  endDate: string | null;

  /** Ghi chú hoặc hướng dẫn thêm của bác sĩ */
  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string | null;

  /** Thời điểm tạo đơn thuốc */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật đơn thuốc gần nhất */
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

  /** Bệnh nhân sử dụng thuốc */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

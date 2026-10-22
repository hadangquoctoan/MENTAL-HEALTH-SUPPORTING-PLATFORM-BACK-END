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

@Entity({ name: 'doctor_notes' })
@Index('idx_doctor_notes_patient_created', ['patientId', 'createdAt'])
export class DoctorNote {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bác sĩ viết ghi chú */
  @Index('idx_doctor_notes_doctor')
  @Column({
    name: 'doctor_id',
    type: 'bigint',
  })
  doctorId: string;

  /** ID của bệnh nhân được ghi chú */
  @Index('idx_doctor_notes_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Nội dung ghi chú chuyên môn của bác sĩ */
  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  /** Thời điểm tạo ghi chú */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật ghi chú gần nhất */
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

  /** Bác sĩ viết ghi chú */
  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  /** Bệnh nhân được ghi chú */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

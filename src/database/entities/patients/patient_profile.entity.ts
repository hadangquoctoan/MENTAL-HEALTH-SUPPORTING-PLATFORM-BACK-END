import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'patient_profiles' })
export class PatientProfile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** Khóa ngoại liên kết 1-1 với bảng users */
  @Index('uq_patient_profiles_user_id', { unique: true })
  @Column({
    name: 'user_id',
    type: 'bigint',
    unique: true,
  })
  userId: string;

  /** Các chẩn đoán tâm lý/tâm thần đã từng được ghi nhận */
  @Column({
    name: 'diagnosis_history',
    type: 'text',
    nullable: true,
  })
  diagnosisHistory: string | null;

  /** Lịch sử điều trị, tư vấn hoặc trị liệu */
  @Column({
    name: 'treatment_history',
    type: 'text',
    nullable: true,
  })
  treatmentHistory: string | null;

  /** Thông tin sức khỏe tâm lý quan trọng khác bác sĩ cần biết */
  @Column({
    name: 'mental_health_notes',
    type: 'text',
    nullable: true,
  })
  mentalHealthNotes: string | null;

  /** Thời điểm tạo hồ sơ */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật hồ sơ gần nhất */
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

  /** Tài khoản người dùng sở hữu hồ sơ bệnh nhân này (1 - 1) */
  @OneToOne(() => User, (user) => user.patientProfile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

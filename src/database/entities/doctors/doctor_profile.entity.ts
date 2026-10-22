import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  Unique,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApprovalStatus } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'doctor_profiles' })
@Unique('uq_doctor_profiles_license', ['licenseNumber'])
export class DoctorProfile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** Khóa ngoại liên kết 1-1 với bảng users */
  @Index('uq_doctor_profiles_user_id', { unique: true })
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: string;

  /** Số chứng chỉ hành nghề y tế (duy nhất) */
  @Column({
    name: 'license_number',
    type: 'varchar',
    length: 100,
  })
  licenseNumber: string;

  /** Trạng thái duyệt hồ sơ: PENDING, APPROVED, REJECTED */
  @Index('idx_doctor_profiles_approval_status')
  @Column({
    name: 'approval_status',
    type: 'enum',
    enum: ApprovalStatus,
    default: ApprovalStatus.PENDING,
  })
  approvalStatus: ApprovalStatus;

  /** ID của Admin duyệt hồ sơ */
  @Index('idx_doctor_profiles_approved_by')
  @Column({
    name: 'approved_by',
    type: 'bigint',
    nullable: true,
  })
  approvedById: string | null;

  /** Thời điểm phê duyệt */
  @Column({
    name: 'approved_at',
    type: 'timestamp',
    nullable: true,
  })
  approvedAt: Date | null;

  /** Số điện thoại liên hệ công việc của bác sĩ */
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  phone: string | null;

  /** Tiểu sử, kinh nghiệm làm việc và chuyên môn */
  @Column({
    name: 'bio',
    type: 'text',
    nullable: true,
  })
  bio: string | null;

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

  /** Tài khoản người dùng sở hữu hồ sơ bác sĩ này (1 - 1) */
  @OneToOne(() => User, (user) => user.doctorProfile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  /** Quản trị viên (Admin) phê duyệt hồ sơ bác sĩ này (Nhiều - 1) */
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'approved_by' })
  approvedBy?: User | null;
}

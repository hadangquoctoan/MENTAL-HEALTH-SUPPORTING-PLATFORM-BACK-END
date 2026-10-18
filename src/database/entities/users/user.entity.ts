import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { UserRole, Gender, UserStatus } from '../../../common/enums';
import { AuditLog } from '../audit-logs/audit-log.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** Vai trò của người dùng: PATIENT, DOCTOR, ADMIN */
  @Index('idx_users_role')
  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  /** Họ và tên đầy đủ */
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  /** Số điện thoại (duy nhất dùng để định danh tài khoản) */
  @Index('uq_users_phone', { unique: true })
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 30,
    unique: true,
  })
  phone: string;

  /** Ngày sinh */
  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date | null;

  /** Giới tính: MALE, FEMALE, OTHER */
  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender | null;

  /** Địa chỉ cư trú */
  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
  })
  address: string | null;

  /** Trạng thái tài khoản: ACTIVE, INACTIVE, BLOCKED */
  @Index('idx_users_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  /** Thời điểm tạo tài khoản */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật tài khoản gần nhất */
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

  /** Danh sách lịch sử kiểm toán do user này thực hiện */
  @OneToMany(() => AuditLog, (auditLog) => auditLog.actor)
  auditLogs: AuditLog[];
}

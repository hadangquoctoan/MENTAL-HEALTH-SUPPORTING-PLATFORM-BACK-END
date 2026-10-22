import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  Check,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DoctorAssignmentStatus } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'doctor_assignments' })
@Index('idx_doc_assign_composite', ['doctorId', 'patientId', 'status'])
@Index('uq_doctor_assignments_active_patient', ['patientId'], {
  unique: true,
  where: `"status" = 'ACTIVE' AND "deleted_at" IS NULL`,
})
@Check(
  'chk_doctor_assignments_active_ended',
  `("status" = 'ACTIVE' AND "ended_at" IS NULL) OR "status" <> 'ACTIVE'`,
)
@Check(
  'chk_doctor_assignments_closed_ended',
  `"status" = 'ACTIVE' OR "ended_at" IS NOT NULL`,
)
@Check(
  'chk_doctor_assignments_dates',
  '"ended_at" IS NULL OR "assigned_at" <= "ended_at"',
)
export class DoctorAssignment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bác sĩ phụ trách */
  @Index('idx_doc_assign_doctor')
  @Column({
    name: 'doctor_id',
    type: 'bigint',
  })
  doctorId: string;

  /** ID của bệnh nhân được phân công */
  @Index('idx_doc_assign_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** ID của phân công trước đó (nếu là chuyển giao bác sĩ) */
  @Index('uq_previous_assignment', { unique: true })
  @Column({
    name: 'previous_assignment_id',
    type: 'bigint',
    nullable: true,
  })
  previousAssignmentId: string | null;

  /** Thời điểm bắt đầu phụ trách */
  @Column({
    name: 'assigned_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  assignedAt: Date;

  /** Thời điểm kết thúc phụ trách (bắt buộc khi status là TRANSFERRED hoặc ENDED) */
  @Column({
    name: 'ended_at',
    type: 'timestamp',
    nullable: true,
  })
  endedAt: Date | null;

  /** Trạng thái phân công: ACTIVE, TRANSFERRED, ENDED */
  @Index('idx_doc_assign_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: DoctorAssignmentStatus,
    default: DoctorAssignmentStatus.ACTIVE,
  })
  status: DoctorAssignmentStatus;

  /** Thời điểm tạo bản ghi */
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

  /** Bác sĩ phụ trách */
  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  /** Bệnh nhân được phân công */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  /** Phân công liền trước (chuỗi chuyển giao bác sĩ) */
  @OneToOne(() => DoctorAssignment, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'previous_assignment_id' })
  previousAssignment?: DoctorAssignment | null;
}

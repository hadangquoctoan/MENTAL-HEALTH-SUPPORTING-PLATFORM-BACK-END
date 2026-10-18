import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PlanStatus } from '../../../common/enums';
import { User } from '../users/user.entity';
import { PlanAction } from './plan_action.entity';

@Entity({ name: 'plans' })
@Index('idx_plans_patient_status', ['patientId', 'status'])
export class Plan {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bệnh nhân sở hữu kế hoạch */
  @Index('idx_plans_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** ID của bác sĩ lập kế hoạch */
  @Index('idx_plans_doctor')
  @Column({
    name: 'doctor_id',
    type: 'bigint',
  })
  doctorId: string;

  /** Tiêu đề của kế hoạch can thiệp/điều trị */
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  /** Mô tả chi tiết kế hoạch */
  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  /** Trạng thái kế hoạch: ACTIVE, COMPLETED, CANCELLED */
  @Index('idx_plans_status')
  @Column({
    name: 'status',
    type: 'enum',
    enum: PlanStatus,
    default: PlanStatus.ACTIVE,
  })
  status: PlanStatus;

  /** Ngày bắt đầu áp dụng kế hoạch */
  @Column({
    name: 'start_date',
    type: 'date',
  })
  startDate: string;

  /** Ngày kết thúc kế hoạch */
  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
  })
  endDate: string | null;

  /** Thời điểm tạo kế hoạch */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật kế hoạch gần nhất */
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

  /** Bệnh nhân được áp dụng kế hoạch */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  /** Bác sĩ lập kế hoạch */
  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  /** Danh sách các hành động trong kế hoạch */
  @OneToMany(() => PlanAction, (action) => action.plan)
  actions: PlanAction[];
}

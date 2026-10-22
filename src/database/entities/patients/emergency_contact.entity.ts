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

@Entity({ name: 'emergency_contacts' })
@Index('idx_emergency_contacts_priority', ['patientId', 'priority'])
export class EmergencyContact {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bệnh nhân sở hữu liên hệ khẩn cấp */
  @Index('idx_emergency_contacts_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Tên người liên hệ khẩn cấp */
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  /** Số điện thoại liên hệ */
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 30,
  })
  phone: string;

  /** Mối quan hệ với bệnh nhân (Bố, Mẹ, Vợ/Chồng, Bạn thân,...) */
  @Column({
    name: 'relationship',
    type: 'varchar',
    length: 100,
  })
  relationship: string;

  /** Mức độ ưu tiên khi liên hệ khẩn cấp (1 = cao nhất, 2+ = thấp hơn) */
  @Column({
    name: 'priority',
    type: 'int',
    default: 1,
  })
  priority: number;

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

  /** Bệnh nhân sở hữu liên hệ khẩn cấp này */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

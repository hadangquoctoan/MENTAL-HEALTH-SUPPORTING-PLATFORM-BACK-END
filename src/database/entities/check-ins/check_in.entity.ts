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
import { StressLevel } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'check_ins' })
@Index('idx_check_ins_patient_created', ['patientId', 'createdAt'])
export class CheckIn {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  /** ID của bệnh nhân thực hiện điểm danh tâm trạng */
  @Index('idx_check_ins_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  /** Kết quả tâm trạng / điểm từ việc bệnh nhân trả lời câu hỏi check-in */
  @Column({
    name: 'mood',
    type: 'varchar',
    length: 50,
  })
  mood: string;

  /** Mức độ căng thẳng do bác sĩ đánh giá sau khi xem xét check-in của bệnh nhân */
  @Column({
    name: 'stress_level',
    type: 'enum',
    enum: StressLevel,
    nullable: true,
  })
  stressLevel: StressLevel | null;

  /** Ghi chú đánh giá của bác sĩ hoặc cảm nghĩ thêm của bệnh nhân */
  @Column({
    name: 'note',
    type: 'text',
    nullable: true,
  })
  note: string | null;

  /** Thời điểm thực hiện điểm danh tâm trạng */
  @Index('idx_check_ins_created')
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  /** Thời điểm cập nhật bản ghi điểm danh gần nhất */
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

  /** Bệnh nhân thực hiện điểm danh */
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

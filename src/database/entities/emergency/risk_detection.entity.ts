import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  Check,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DetectionLayer, RiskLevel, SourceType } from '../../../common/enums';
import { User } from '../users/user.entity';

@Entity({ name: 'risk_detections' })
@Index('idx_risk_detections_composite', [
  'patientId',
  'riskLevel',
  'detectedAt',
])
@Check(
  'chk_risk_detections_confidence',
  '"confidence" >= 0 AND "confidence" <= 1',
)
export class RiskDetection {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_risk_detections_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Column({
    name: 'source_type',
    type: 'enum',
    enum: SourceType,
  })
  sourceType: SourceType;

  @Column({
    name: 'detection_layer',
    type: 'enum',
    enum: DetectionLayer,
  })
  detectionLayer: DetectionLayer;

  @Column({
    name: 'signal',
    type: 'text',
  })
  signal: string;

  @Index('idx_risk_detections_risk_level')
  @Column({
    name: 'risk_level',
    type: 'enum',
    enum: RiskLevel,
  })
  riskLevel: RiskLevel;

  @Column({
    name: 'confidence',
    type: 'double precision',
  })
  confidence: number;

  @Index('idx_risk_detections_detected')
  @Column({
    name: 'detected_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  detectedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
}

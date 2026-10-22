import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'audit_logs' })
@Index('idx_audit_logs_entity', ['entityType', 'entityId'])
@Index('idx_audit_logs_actor_created', ['actorId', 'createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_audit_logs_actor')
  @Column({
    name: 'actor_id',
    type: 'bigint',
    comment: 'Người thực hiện hành động',
  })
  actorId: string;

  @Column({
    name: 'action',
    type: 'varchar',
    length: 255,
    comment: 'CREATE, UPDATE, DELETE, LOGIN, etc.',
  })
  action: string;

  @Index('idx_audit_logs_entity_type')
  @Column({
    name: 'entity_type',
    type: 'varchar',
    length: 100,
    comment: 'Bảng nào bị ảnh hưởng',
  })
  entityType: string;

  @Column({
    name: 'entity_id',
    type: 'bigint',
    comment: 'ID của record bị tác động',
  })
  entityId: string;

  @Column({
    name: 'old_value',
    type: 'jsonb',
    nullable: true,
    comment: 'Giá trị cũ trước khi thay đổi',
  })
  oldValue: Record<string, any> | null;

  @Column({
    name: 'new_value',
    type: 'jsonb',
    nullable: true,
    comment: 'Giá trị mới sau khi thay đổi',
  })
  newValue: Record<string, any> | null;

  @Index('idx_audit_logs_created')
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // Quan hệ với bảng users (khóa ngoại fk_audit_logs_actor)
  @ManyToOne(() => User, (user) => user.auditLogs, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'actor_id' })
  actor: User;
}

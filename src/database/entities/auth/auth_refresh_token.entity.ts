import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { AuthSession } from './auth_session.entity';

@Entity({ name: 'auth_refresh_tokens' })
@Unique('uq_auth_refresh_tokens_token_hash', ['tokenHash'])
export class AuthRefreshToken {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_auth_refresh_tokens_session_id')
  @Column({
    name: 'session_id',
    type: 'bigint',
  })
  sessionId: string;

  @Column({
    name: 'token_hash',
    type: 'char',
    length: 64,
  })
  tokenHash: string;

  @Index('idx_auth_refresh_tokens_expires_at')
  @Column({
    name: 'expires_at',
    type: 'timestamp',
  })
  expiresAt: Date;

  @Column({
    name: 'revoked_at',
    type: 'timestamp',
    nullable: true,
  })
  revokedAt: Date | null;

  @Column({
    name: 'replaced_by_id',
    type: 'bigint',
    nullable: true,
  })
  replacedById: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => AuthSession, (session) => session.tokens, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'session_id',
    foreignKeyConstraintName: 'fk_auth_refresh_tokens_session',
  })
  session: AuthSession;

  @ManyToOne(() => AuthRefreshToken, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'replaced_by_id',
    foreignKeyConstraintName: 'fk_auth_refresh_tokens_replaced_by',
  })
  replacedBy: AuthRefreshToken | null;
}

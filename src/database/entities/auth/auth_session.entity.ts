import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { AuthRefreshToken } from './auth_refresh_token.entity';

@Entity({ name: 'auth_sessions' })
export class AuthSession {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_auth_sessions_user_id')
  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: string;

  @Index('idx_auth_sessions_expires_at')
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
    name: 'revoked_reason',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  revokedReason: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'last_used_at',
    type: 'timestamp',
    nullable: true,
  })
  lastUsedAt: Date | null;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => AuthRefreshToken, (token) => token.session)
  tokens: AuthRefreshToken[];
}

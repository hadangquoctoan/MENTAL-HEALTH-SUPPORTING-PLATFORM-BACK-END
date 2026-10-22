import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SenderRole } from '../../../common/enums';
import { ChatSession } from './chat_session.entity';

@Entity({ name: 'chat_messages' })
@Index('idx_chat_messages_session_created', ['sessionId', 'createdAt'])
export class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_chat_messages_session')
  @Column({
    name: 'session_id',
    type: 'bigint',
  })
  sessionId: string;

  @Column({
    name: 'sender_role',
    type: 'enum',
    enum: SenderRole,
  })
  senderRole: SenderRole;

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string;

  @Index('idx_chat_messages_created')
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => ChatSession, (session) => session.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  session: ChatSession;
}

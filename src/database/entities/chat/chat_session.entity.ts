import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ChatMode } from '../../../common/enums';
import { User } from '../users/user.entity';
import { ChatMessage } from './chat_message.entity';

@Entity({ name: 'chat_sessions' })
@Index('idx_chat_sessions_patient_started', ['patientId', 'startedAt'])
export class ChatSession {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_chat_sessions_patient')
  @Column({
    name: 'patient_id',
    type: 'bigint',
  })
  patientId: string;

  @Index('idx_chat_sessions_doctor')
  @Column({
    name: 'doctor_id',
    type: 'bigint',
  })
  doctorId: string;

  @Column({
    name: 'mode',
    type: 'enum',
    enum: ChatMode,
    default: ChatMode.NORMAL,
  })
  mode: ChatMode;

  @Column({
    name: 'started_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startedAt: Date;

  @Column({
    name: 'ended_at',
    type: 'timestamp',
    nullable: true,
  })
  endedAt: Date | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @ManyToOne(() => User, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'doctor_id' })
  doctor: User;

  @OneToMany(() => ChatMessage, (message) => message.session)
  messages: ChatMessage[];
}

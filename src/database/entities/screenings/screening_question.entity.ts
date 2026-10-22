import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuestionType } from '../../../common/enums';
import { ScreeningType } from './screening_type.entity';

@Entity({ name: 'screening_questions' })
@Unique('uq_type_question_number', ['screeningTypeId', 'questionNumber'])
export class ScreeningQuestion {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Index('idx_screening_questions_type')
  @Column({
    name: 'screening_type_id',
    type: 'bigint',
  })
  screeningTypeId: string;

  @Column({
    name: 'question_number',
    type: 'int',
  })
  questionNumber: number;

  @Column({
    name: 'question_text',
    type: 'text',
  })
  questionText: string;

  @Column({
    name: 'question_type',
    type: 'enum',
    enum: QuestionType,
  })
  questionType: QuestionType;

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

  @ManyToOne(() => ScreeningType, (type) => type.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'screening_type_id' })
  screeningType: ScreeningType;
}

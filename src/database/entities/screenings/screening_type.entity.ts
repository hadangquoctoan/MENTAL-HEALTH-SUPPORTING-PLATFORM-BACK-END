import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { ScreeningQuestion } from './screening_question.entity';
import { ScreeningResult } from './screening_result.entity';

@Entity({ name: 'screening_types' })
@Unique('uq_screening_types_code', ['code'])
export class ScreeningType {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 50,
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'total_questions',
    type: 'int',
  })
  totalQuestions: number;

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

  @OneToMany(() => ScreeningQuestion, (question) => question.screeningType)
  questions: ScreeningQuestion[];

  @OneToMany(() => ScreeningResult, (result) => result.screeningType)
  results: ScreeningResult[];
}

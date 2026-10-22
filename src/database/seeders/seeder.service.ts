import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionType } from '../../common/enums';
import { StreakMilestone } from '../entities/gamification/streak_milestone.entity';
import { ScreeningQuestion } from '../entities/screenings/screening_question.entity';
import { ScreeningType } from '../entities/screenings/screening_type.entity';

interface ScreeningSeed {
  code: string;
  name: string;
  description: string;
  questions: string[];
}

const SCREENINGS: ScreeningSeed[] = [
  {
    code: 'PHQ-9',
    name: 'PHQ-9 - Đánh giá trầm cảm',
    description:
      'Trong 2 tuần qua, bạn bị làm phiền bởi các vấn đề sau bao thường xuyên?',
    questions: [
      'Ít quan tâm hoặc không thấy hứng thú khi làm việc',
      'Cảm thấy buồn bã, chán nản hoặc tuyệt vọng',
      'Khó đi vào giấc ngủ, khó ngủ liên tục hoặc ngủ quá nhiều',
      'Cảm thấy mệt mỏi hoặc ít năng lượng',
      'Ăn uống kém ngon miệng hoặc ăn quá nhiều',
      'Cảm thấy tồi tệ về bản thân, hoặc cảm thấy mình là người thất bại hoặc đã làm bản thân/gia đình thất vọng',
      'Khó tập trung vào mọi việc, chẳng hạn khi đọc báo hoặc xem tivi',
      'Di chuyển hoặc nói chậm đến mức người khác nhận thấy; hoặc ngược lại, bồn chồn hoặc khó ngồi yên đến mức phải di chuyển nhiều hơn bình thường',
      'Có ý nghĩ rằng mình nên chết đi hoặc muốn tự làm đau bản thân',
    ],
  },
  {
    code: 'GAD-7',
    name: 'GAD-7 - Đánh giá lo âu',
    description:
      'Trong 2 tuần qua, bạn bị làm phiền bởi các vấn đề sau bao thường xuyên?',
    questions: [
      'Cảm thấy lo lắng, bồn chồn hoặc căng thẳng',
      'Không thể ngừng hoặc kiểm soát được cảm giác lo lắng',
      'Lo lắng quá nhiều về những điều khác nhau',
      'Khó thư giãn',
      'Bồn chồn đến mức khó ngồi yên',
      'Dễ trở nên cáu kỉnh hoặc khó chịu',
      'Cảm thấy sợ hãi như thể điều gì đó tồi tệ sắp xảy ra',
    ],
  },
];

const STREAK_MILESTONES = [
  {
    streakDays: 3,
    title: 'Khởi đầu 3 ngày',
    description: 'Duy trì thói quen liên tiếp trong 3 ngày.',
    badgeIcon: 'badge-streak-3',
    points: 10,
  },
  {
    streakDays: 7,
    title: 'Kiên trì 7 ngày',
    description: 'Duy trì thói quen liên tiếp trong 7 ngày.',
    badgeIcon: 'badge-streak-7',
    points: 20,
  },
  {
    streakDays: 14,
    title: 'Kiên trì 14 ngày',
    description: 'Duy trì thói quen liên tiếp trong 14 ngày.',
    badgeIcon: 'badge-streak-14',
    points: 40,
  },
  {
    streakDays: 30,
    title: 'Kiên trì 1 tháng',
    description: 'Duy trì thói quen liên tiếp trong 30 ngày.',
    badgeIcon: 'badge-streak-30',
    points: 80,
  },
  {
    streakDays: 60,
    title: 'Kiên trì 2 tháng',
    description: 'Duy trì thói quen liên tiếp trong 60 ngày.',
    badgeIcon: 'badge-streak-60',
    points: 150,
  },
  {
    streakDays: 90,
    title: 'Kiên trì 3 tháng',
    description: 'Duy trì thói quen liên tiếp trong 90 ngày.',
    badgeIcon: 'badge-streak-90',
    points: 250,
  },
  {
    streakDays: 180,
    title: 'Kiên trì 6 tháng',
    description: 'Duy trì thói quen liên tiếp trong 180 ngày.',
    badgeIcon: 'badge-streak-180',
    points: 500,
  },
  {
    streakDays: 365,
    title: 'Kiên trì 1 năm',
    description: 'Duy trì thói quen liên tiếp trong 365 ngày.',
    badgeIcon: 'badge-streak-365',
    points: 1000,
  },
];

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(ScreeningType)
    private readonly screeningTypes: Repository<ScreeningType>,
    @InjectRepository(ScreeningQuestion)
    private readonly screeningQuestions: Repository<ScreeningQuestion>,
    @InjectRepository(StreakMilestone)
    private readonly streakMilestones: Repository<StreakMilestone>,
  ) {}

  async seed(): Promise<void> {
    await this.seedScreenings();
    await this.seedStreakMilestones();
  }

  private async seedScreenings(): Promise<void> {
    for (const screening of SCREENINGS) {
      await this.screeningTypes.upsert(
        {
          code: screening.code,
          name: screening.name,
          description: screening.description,
          totalQuestions: screening.questions.length,
        },
        ['code'],
      );

      const screeningType = await this.screeningTypes.findOneOrFail({
        where: { code: screening.code },
      });

      await this.screeningQuestions.upsert(
        screening.questions.map((questionText, index) => ({
          screeningTypeId: screeningType.id,
          questionNumber: index + 1,
          questionText,
          questionType: QuestionType.SCALE,
        })),
        ['screeningTypeId', 'questionNumber'],
      );
    }
  }

  private async seedStreakMilestones(): Promise<void> {
    await this.streakMilestones.upsert(
      STREAK_MILESTONES.map((milestone) =>
        this.streakMilestones.create(milestone),
      ),
      ['streakDays'],
    );
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from './entities';
import { ScreeningQuestion } from './entities/screenings/screening_question.entity';
import { ScreeningType } from './entities/screenings/screening_type.entity';
import { StreakMilestone } from './entities/gamification/streak_milestone.entity';
import { SeederService } from './seeders/seeder.service';

interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const db = config.getOrThrow<DatabaseConfig>('database');
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.user,
          password: db.password,
          database: db.name,
          entities,
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([
      ScreeningType,
      ScreeningQuestion,
      StreakMilestone,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class DatabaseModule {}

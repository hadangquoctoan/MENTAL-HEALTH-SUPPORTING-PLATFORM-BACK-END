import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { jwtConfig } from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { CarePlansModule } from './modules/care-plans/care-plans.module';
import { CheckInsModule } from './modules/check-ins/check-ins.module';
import { ScreeningsModule } from './modules/screenings/screenings.module';
import { ChatModule } from './modules/chat/chat.module';
import { EmergencyModule } from './modules/emergency/emergency.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    DoctorsModule,
    CarePlansModule,
    CheckInsModule,
    ScreeningsModule,
    ChatModule,
    EmergencyModule,
    RemindersModule,
    NotificationsModule,
    GamificationModule,
    AuditLogsModule,
  ],
})
export class AppModule {}

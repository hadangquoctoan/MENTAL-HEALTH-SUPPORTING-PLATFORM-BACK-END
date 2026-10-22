import { AuditLog } from './audit-logs/audit-log.entity';
import { User } from './users/user.entity';
import { PatientProfile } from './patients/patient_profile.entity';
import { EmergencyContact } from './patients/emergency_contact.entity';
import { DoctorProfile } from './doctors/doctor_profile.entity';
import { DoctorAssignment } from './doctors/doctor_assignment.entity';
import { DoctorNote } from './doctors/doctor_note.entity';
import { DoctorNotification } from './doctors/doctor_notification.entity';
import { Plan } from './plans/plan.entity';
import { PlanAction } from './plans/plan_action.entity';
import { ActionLog } from './plans/action_log.entity';
import { ReminderLog } from './plans/reminder_log.entity';
import { Medication } from './plans/medication.entity';
import { CheckIn } from './check-ins/check_in.entity';
import { ScreeningType } from './screenings/screening_type.entity';
import { ScreeningAttempt } from './screenings/screening_attempt.entity';
import { ScreeningQuestion } from './screenings/screening_question.entity';
import { ScreeningResult } from './screenings/screening_result.entity';
import { ChatSession } from './chat/chat_session.entity';
import { ChatMessage } from './chat/chat_message.entity';
import { RiskDetection } from './emergency/risk_detection.entity';
import { EmergencyEvent } from './emergency/emergency_event.entity';
import { EmergencyAction } from './emergency/emergency_action.entity';
import { PatientStreak } from './gamification/patient_streak.entity';
import { StreakLog } from './gamification/streak_log.entity';
import { StreakMilestone } from './gamification/streak_milestone.entity';
import { PatientAchievement } from './gamification/patient_achievement.entity';

export const entities = [
  AuditLog,
  User,
  PatientProfile,
  EmergencyContact,
  DoctorProfile,
  DoctorAssignment,
  DoctorNote,
  DoctorNotification,
  Plan,
  PlanAction,
  ActionLog,
  ReminderLog,
  Medication,
  CheckIn,
  ScreeningType,
  ScreeningAttempt,
  ScreeningQuestion,
  ScreeningResult,
  ChatSession,
  ChatMessage,
  RiskDetection,
  EmergencyEvent,
  EmergencyAction,
  PatientStreak,
  StreakLog,
  StreakMilestone,
  PatientAchievement,
];

export * from './audit-logs/audit-log.entity';
export * from './users/user.entity';
export * from './patients/patient_profile.entity';
export * from './patients/emergency_contact.entity';
export * from './doctors/doctor_profile.entity';
export * from './doctors/doctor_assignment.entity';
export * from './doctors/doctor_note.entity';
export * from './doctors/doctor_notification.entity';
export * from './plans/plan.entity';
export * from './plans/plan_action.entity';
export * from './plans/action_log.entity';
export * from './plans/reminder_log.entity';
export * from './plans/medication.entity';
export * from './check-ins/check_in.entity';
export * from './screenings/screening_type.entity';
export * from './screenings/screening_attempt.entity';
export * from './screenings/screening_question.entity';
export * from './screenings/screening_result.entity';
export * from './chat/chat_session.entity';
export * from './chat/chat_message.entity';
export * from './emergency/risk_detection.entity';
export * from './emergency/emergency_event.entity';
export * from './emergency/emergency_action.entity';
export * from './gamification/patient_streak.entity';
export * from './gamification/streak_log.entity';
export * from './gamification/streak_milestone.entity';
export * from './gamification/patient_achievement.entity';

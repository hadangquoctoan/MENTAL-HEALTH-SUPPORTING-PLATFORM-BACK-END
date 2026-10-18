// Enums from DBML & Database Schema
export enum UserRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum DoctorAssignmentStatus {
  ACTIVE = 'ACTIVE',
  TRANSFERRED = 'TRANSFERRED',
  ENDED = 'ENDED',
}

export enum ScreeningStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export enum QuestionType {
  SCALE = 'SCALE',
  YES_NO = 'YES_NO',
  TEXT = 'TEXT',
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ActionType {
  MEDICATION = 'MEDICATION',
  EXERCISE = 'EXERCISE',
  SLEEP = 'SLEEP',
  JOURNAL = 'JOURNAL',
  APPOINTMENT = 'APPOINTMENT',
  CUSTOM = 'CUSTOM',
}

export enum ActionLogStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
  DECLINED = 'DECLINED',
}

export enum ChatMode {
  NORMAL = 'NORMAL',
}

export enum SenderRole {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
  SYSTEM = 'SYSTEM',
}

export enum SourceType {
  CHAT = 'CHAT',
  CHECK_IN = 'CHECK_IN',
  SCREENING = 'SCREENING',
}

export enum DetectionLayer {
  REGEX = 'REGEX',
  PHOBERT = 'PHOBERT',
}

export enum RiskLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum EmergencyEventStatus {
  TRIGGERED = 'TRIGGERED',
  HELP_ON_WAY = 'HELP_ON_WAY',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export enum DoctorNotificationType {
  RISK_ALERT = 'RISK_ALERT',
  ADHERENCE_ALERT = 'ADHERENCE_ALERT',
  MOOD_ALERT = 'MOOD_ALERT',
  SCREENING_RESULT = 'SCREENING_RESULT',
  PLAN_REMINDER = 'PLAN_REMINDER',
}

export enum EmergencyActionType {
  CALL_115 = 'CALL_115',
  SEND_SMS_TO_CONTACT = 'SEND_SMS_TO_CONTACT',
  DISPATCH_AMBULANCE = 'DISPATCH_AMBULANCE',
  CUSTOM = 'CUSTOM',
}

export enum EmergencyActionResult {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum ReminderType {
  ZALO = 'ZALO',
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
  WEB = 'WEB',
}

export enum ReminderStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export enum StressLevel {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
}

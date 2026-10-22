import { MigrationInterface, QueryRunner } from 'typeorm';

// Delta from the pre-v2 PostgreSQL schema; fresh databases are provisioned by init-db/mental_health_db.sql.
const SINGLE_COLUMN_INDEXES: Array<[string, string, string]> = [
  ['medications', 'idx_medications_patient', '"patient_id"'],
  ['emergency_contacts', 'idx_emergency_contacts_patient', '"patient_id"'],
  ['doctor_assignments', 'idx_doc_assign_doctor', '"doctor_id"'],
  ['screening_attempts', 'idx_screening_attempts_patient', '"patient_id"'],
  [
    'screening_questions',
    'idx_screening_questions_type',
    '"screening_type_id"',
  ],
  ['screening_results', 'idx_screening_results_patient', '"patient_id"'],
  ['check_ins', 'idx_check_ins_patient', '"patient_id"'],
  ['plans', 'idx_plans_patient', '"patient_id"'],
  ['action_logs', 'idx_action_logs_patient', '"patient_id"'],
  ['action_logs', 'idx_action_logs_action', '"action_id"'],
  ['chat_sessions', 'idx_chat_sessions_patient', '"patient_id"'],
  ['chat_messages', 'idx_chat_messages_session', '"session_id"'],
  ['risk_detections', 'idx_risk_detections_patient', '"patient_id"'],
  ['emergency_events', 'idx_emergency_events_patient', '"patient_id"'],
  ['doctor_notifications', 'idx_doctor_notifications_doctor', '"doctor_id"'],
  ['doctor_notes', 'idx_doctor_notes_patient', '"patient_id"'],
  ['streak_logs', 'idx_streak_logs_patient', '"patient_id"'],
  ['patient_achievements', 'idx_patient_achievements_patient', '"patient_id"'],
  ['audit_logs', 'idx_audit_logs_actor', '"actor_id"'],
  ['audit_logs', 'idx_audit_logs_entity_type', '"entity_type"'],
];

export class AlignDbschemaV21792637274948 implements MigrationInterface {
  name = 'AlignDbschemaV21792637274948';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "gender" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "check_ins" ALTER COLUMN "mood" DROP NOT NULL',
    );

    const statusColumns: Array<{ data_type: string }> =
      await queryRunner.query(`
        SELECT data_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'users'
          AND column_name = 'status'
      `);

    if (statusColumns[0]?.data_type === 'USER-DEFINED') {
      await queryRunner.query(
        'ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT',
      );
      await queryRunner.query(
        'ALTER TABLE "users" ALTER COLUMN "status" TYPE varchar(50) USING "status"::text',
      );
      await queryRunner.query(
        `ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
      );
      await queryRunner.query('DROP TYPE IF EXISTS "users_status_enum"');
    }

    const passwordColumns: Array<{ column_name: string }> =
      await queryRunner.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'users'
          AND column_name = 'password_hash'
      `);

    if (passwordColumns.length === 0) {
      await queryRunner.query(
        'ALTER TABLE "users" ADD COLUMN "password_hash" varchar(255)',
      );

      const [{ count }]: Array<{ count: number }> = await queryRunner.query(
        'SELECT count(*)::int AS count FROM "users"',
      );

      if (count > 0) {
        const [{ count: pgcryptoCount }]: Array<{ count: number }> =
          await queryRunner.query(
            `SELECT count(*)::int AS count FROM pg_extension WHERE extname = 'pgcrypto'`,
          );
        const createdPgcrypto = pgcryptoCount === 0;

        if (createdPgcrypto) {
          await queryRunner.query('CREATE EXTENSION "pgcrypto"');
        }

        await queryRunner.query(`
          UPDATE "users"
          SET "password_hash" = crypt(encode(gen_random_bytes(32), 'hex'), gen_salt('bf'))
          WHERE "password_hash" IS NULL
        `);

        if (createdPgcrypto) {
          await queryRunner.query('DROP EXTENSION "pgcrypto"');
        }
      }

      await queryRunner.query(
        'ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL',
      );
    }

    await queryRunner.query(
      'ALTER TABLE "doctor_profiles" ALTER COLUMN "phone" DROP DEFAULT',
    );
    await queryRunner.query(
      'ALTER TABLE "streak_milestones" ALTER COLUMN "badge_icon" DROP DEFAULT',
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "users"."password_hash" IS 'Bcrypt hash — MVP dùng phone/password auth, không OTP'`,
    );

    await queryRunner.query(
      'ALTER TABLE "audit_logs" ALTER COLUMN "old_value" TYPE jsonb USING "old_value"::jsonb',
    );
    await queryRunner.query(
      'ALTER TABLE "audit_logs" ALTER COLUMN "new_value" TYPE jsonb USING "new_value"::jsonb',
    );

    await queryRunner.query(
      'ALTER TABLE "medications" DROP CONSTRAINT IF EXISTS "chk_medications_date_range"',
    );
    await queryRunner.query(`
      ALTER TABLE "medications"
      ADD CONSTRAINT "chk_medications_date_range"
      CHECK ("end_date" IS NULL OR "end_date" >= "start_date")
    `);

    await queryRunner.query(
      'ALTER TABLE "plans" DROP CONSTRAINT IF EXISTS "chk_plans_date_range"',
    );
    await queryRunner.query(`
      ALTER TABLE "plans"
      ADD CONSTRAINT "chk_plans_date_range"
      CHECK ("end_date" IS NULL OR "end_date" >= "start_date")
    `);

    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_active_ended"',
    );
    await queryRunner.query(`
      ALTER TABLE "doctor_assignments"
      ADD CONSTRAINT "chk_doctor_assignments_active_ended"
      CHECK (("status" = 'ACTIVE' AND "ended_at" IS NULL) OR "status" <> 'ACTIVE')
    `);

    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_closed_ended"',
    );
    await queryRunner.query(`
      ALTER TABLE "doctor_assignments"
      ADD CONSTRAINT "chk_doctor_assignments_closed_ended"
      CHECK ("status" = 'ACTIVE' OR "ended_at" IS NOT NULL)
    `);

    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_dates"',
    );
    await queryRunner.query(`
      ALTER TABLE "doctor_assignments"
      ADD CONSTRAINT "chk_doctor_assignments_dates"
      CHECK ("ended_at" IS NULL OR "assigned_at" <= "ended_at")
    `);

    await queryRunner.query(
      'ALTER TABLE "risk_detections" DROP CONSTRAINT IF EXISTS "chk_risk_detections_confidence"',
    );
    await queryRunner.query(`
      ALTER TABLE "risk_detections"
      ADD CONSTRAINT "chk_risk_detections_confidence"
      CHECK ("confidence" >= 0 AND "confidence" <= 1)
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "uq_doctor_assignments_active_patient"
      ON "doctor_assignments" ("patient_id")
      WHERE "status" = 'ACTIVE' AND "deleted_at" IS NULL
    `);

    await queryRunner.query('DROP INDEX IF EXISTS "fk_emergency_events_risk"');

    for (const [table, index, column] of SINGLE_COLUMN_INDEXES) {
      await queryRunner.query(
        `CREATE INDEX IF NOT EXISTS "${index}" ON "${table}" (${column})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const [, index] of SINGLE_COLUMN_INDEXES) {
      await queryRunner.query(`DROP INDEX IF EXISTS "${index}"`);
    }

    await queryRunner.query(
      'DROP INDEX IF EXISTS "uq_doctor_assignments_active_patient"',
    );

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "fk_emergency_events_risk"
      ON "emergency_events" ("risk_detection_id")
    `);

    await queryRunner.query(
      'ALTER TABLE "risk_detections" DROP CONSTRAINT IF EXISTS "chk_risk_detections_confidence"',
    );
    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_dates"',
    );
    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_closed_ended"',
    );
    await queryRunner.query(
      'ALTER TABLE "doctor_assignments" DROP CONSTRAINT IF EXISTS "chk_doctor_assignments_active_ended"',
    );
    await queryRunner.query(
      'ALTER TABLE "plans" DROP CONSTRAINT IF EXISTS "chk_plans_date_range"',
    );
    await queryRunner.query(
      'ALTER TABLE "medications" DROP CONSTRAINT IF EXISTS "chk_medications_date_range"',
    );

    await queryRunner.query(
      'ALTER TABLE "audit_logs" ALTER COLUMN "old_value" TYPE json USING "old_value"::json',
    );
    await queryRunner.query(
      'ALTER TABLE "audit_logs" ALTER COLUMN "new_value" TYPE json USING "new_value"::json',
    );

    await queryRunner.query(
      'ALTER TABLE "users" DROP COLUMN IF EXISTS "password_hash"',
    );

    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT',
    );
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "users_status_enum" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "status" TYPE "users_status_enum" USING "status"::"users_status_enum"',
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );

    await queryRunner.query(
      'ALTER TABLE "check_ins" ALTER COLUMN "mood" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "gender" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "doctor_profiles" ALTER COLUMN "phone" SET DEFAULT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "streak_milestones" ALTER COLUMN "badge_icon" SET DEFAULT NULL',
    );
  }
}

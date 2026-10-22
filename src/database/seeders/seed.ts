import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeederService } from './seeder.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    await app.get(SeederService).seed();
    console.log('Database seeding completed.');
  } finally {
    await app.close();
  }
}

bootstrap().catch((error) => {
  console.error('Database seeding failed:', error);
  process.exitCode = 1;
});

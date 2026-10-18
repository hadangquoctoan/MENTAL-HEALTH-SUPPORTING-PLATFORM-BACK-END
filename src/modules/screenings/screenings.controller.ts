import { Controller } from '@nestjs/common';
import { ScreeningsService } from './screenings.service';

@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}
}

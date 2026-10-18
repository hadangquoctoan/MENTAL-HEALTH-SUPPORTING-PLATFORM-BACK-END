import { Controller } from '@nestjs/common';
import { CheckInsService } from './check-ins.service';

@Controller('check-ins')
export class CheckInsController {
  constructor(private readonly checkinsService: CheckInsService) {}
}

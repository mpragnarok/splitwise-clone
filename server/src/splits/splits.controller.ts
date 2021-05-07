import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('splits')
@UseGuards(AuthGuard())
export class SplitsController {

}

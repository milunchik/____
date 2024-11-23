import {
  Controller,
  Post,
  Body,
  Session,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryCreateDTO } from './dtos/quest.dto';

@Controller('questionary')
export class QuestionaryController {
  constructor(private questionaryService: QuestionaryService) {}

  @Post('/send')
  async create(@Body() body: QuestionaryCreateDTO) {
    return this.questionaryService.create(
      body.email,
      body.fullname,
      body.phone_number,
      body.age,
      body.teacher,
      body.subject,
      body.description,
    );
  }
}

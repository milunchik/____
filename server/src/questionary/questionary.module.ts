import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionarySchema } from './questionary.schema';
import { QuestionaryController } from './questionary.controller';
import { CustomMailerModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Questionary', schema: QuestionarySchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CustomMailerModule,
  ],
  providers: [QuestionaryService, UserService],
  controllers: [QuestionaryController],
})
export class QuestionaryModule {}

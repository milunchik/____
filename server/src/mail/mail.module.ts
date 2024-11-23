import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerService } from './mail.service';
import { mailerInfo } from 'config/mailerInfo';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: mailerInfo.user,
          pass: mailerInfo.pass,
        },
      },
    }),
  ],
  providers: [CustomMailerService],
  exports: [CustomMailerService],
})
export class CustomMailerModule {}

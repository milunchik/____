import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user.module';
import { CustomMailerService } from 'src/mail/mail.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService, CustomMailerService],
  exports: [AuthService],
})
export class AuthModule {}

import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { AuthService } from './auth/auth.service';
import { CustomMailerService } from 'src/mail/mail.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, CustomMailerService],
  exports: [UserService],
})
export class UserModule {}

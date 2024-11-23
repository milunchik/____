import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';
import { AuthModule } from './user/auth/auth.module';
import { CustomMailerService } from './mail/mail.service';
import { UserModule } from './user/user.module';
import { QuestionaryModule } from './questionary/questionary.module';

import { mailerInfo } from '../config/mailerInfo';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
      serveRoot: '/',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'userImage/'),
      serveRoot: 'server/assets/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
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

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const uri =
          config.get<string>('USER_LOCATION') === 'local'
            ? `mongodb://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_HOST')}:${config.get<string>('DB_PORT')}/${config.get<string>('DB_NAME')}`
            : `mongodb+srv://${config.get<string>('DB_USER')}:${config.get<string>('DB_PASSWORD')}@${config.get<string>('DB_CLUSTER')}.${config.get<string>('DB_HASH')}.mongodb.net/${config.get<string>('DB_NAME')}?retryWrites=true&w=majority&appName=VeilCluster`;
        return { uri };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
    UserModule,
    QuestionaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, CustomMailerService, AuthGuard],
})
export class AppModule {}

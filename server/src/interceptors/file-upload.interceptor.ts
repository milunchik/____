import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'node:path';

@Injectable()
export class MyFileInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const multerFileInterceptor = new (FileInterceptor('image', {
        storage: diskStorage({
          destination: './assets/userImage',
          filename: (req, image, callback) => {
            const imagename = path.parse(image.originalname).name.replace(/\s/g, '') + Date.now();
            const extension = path.parse(image.originalname).ext;
            callback(null, `${imagename}${extension}`);
          },
        }),
      }))();
  
      return multerFileInterceptor.intercept(context, next);
    }
}

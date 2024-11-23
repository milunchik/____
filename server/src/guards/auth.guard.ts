import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from '../user/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session || !session.userId) {
      return false;
    }

    const user = await this.authService.getUser(session.userId);

    if (!user) {
      return false;
    }

    request.user = user;
    return !!user;
  }
}

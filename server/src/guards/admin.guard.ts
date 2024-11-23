import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/utils/user-roles.constants';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const { userId, userRole } = request.session;

    if (!userId || !userRole) {
      throw new ForbiddenException('User not authenticated');
    }

    if (userRole !== Role.ADMIN) {
      throw new ForbiddenException('Access restricted to admin users');
    }

    return true;
  }
}

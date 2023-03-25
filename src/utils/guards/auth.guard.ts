import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (roles == null) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // validate the request
    // const user = request.user;
    // matchRoles(roles, user.roles);
    return true;
  }
}

// Read more about:
// https://docs.nestjs.com/security/authentication
// https://docs.nestjs.com/security/authorization

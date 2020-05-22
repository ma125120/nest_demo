import { applyDecorators, SetMetadata, UseGuards, UseInterceptors, ClassSerializerInterceptor, HttpException } from '@nestjs/common';
import { Role } from '@/user/user.entity';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new HttpException('token已失效，请刷新', 401);
    }

    const isValid = roles.includes(user.role);
    if (!isValid) {
      throw new HttpException('权限不足，无法访问', 402)
    } 

    return isValid;
  }
}

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    UseInterceptors(ClassSerializerInterceptor),
    // ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}

export function AuthAdmin() {
  return Auth(Role.admin, Role.superadmin);
}

export function AuthSuper() {
  return Auth(Role.superadmin);
}

import { Injectable, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(ctx) {
    return super.canActivate(ctx);
  }
  handleRequest(_, user: any,) {
    // if (!user) {
    //   throw new UnauthorizedException('token已失效，请重新登录')
    // }
    return user;
  }

  // handleRequest(_, user: any, err, host: ExecutionContext) {
  //   console.log(args);
  //   return user;
  // }
}


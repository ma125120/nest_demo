
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, applyDecorators, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { transfromData, } from '@/common/decorator';
import { CateResource } from './cateResource.entity';

@Injectable()
export class CateResourceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        // tap((data) => {
        //   console.log(data)
        // }),
        map(res => transfromData(res, CateResource,))
      )
  }
}

export const UseCateResourceInterceptor = () => {
  return applyDecorators(
    UseInterceptors(CateResourceInterceptor),
  )
}

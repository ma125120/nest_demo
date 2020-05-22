
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, applyDecorators, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { transfromData, } from '@/common/decorator';
import { Job } from './job.entity';

@Injectable()
export class JobInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        // tap((data) => {
        //   console.log(data)
        // }),
        map(res => transfromData(res, Job,))
      )
  }
}

export const UseJobInterceptor = () => {
  return applyDecorators(
    UseInterceptors(JobInterceptor),
  )
}


import { Injectable, NestInterceptor, ExecutionContext, CallHandler, applyDecorators, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { transfromData, } from '@/common/decorator';
import { Record } from './record.entity';

@Injectable()
export class RecordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        // tap((data) => {
        //   console.log(data)
        // }),
        map(res => transfromData(res, Record,))
      )
  }
}

export const UseRecordInterceptor = () => {
  return applyDecorators(
    UseInterceptors(RecordInterceptor),
  )
}

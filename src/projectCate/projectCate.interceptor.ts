
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, applyDecorators, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { transfromData, } from '@/common/decorator';
import { ProjectCate } from './projectCate.entity';

@Injectable()
export class ProjectCateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        // tap((data) => {
        //   console.log(data)
        // }),
        map(res => transfromData(res, ProjectCate,))
      )
  }
}

export const UseProjectCateInterceptor = () => {
  return applyDecorators(
    UseInterceptors(ProjectCateInterceptor),
  )
}

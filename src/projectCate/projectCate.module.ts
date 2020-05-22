
import { Module } from '@nestjs/common';
import { ProjectCateService } from './projectCate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectCate } from './projectCate.entity';
import { ProjectCateClientController } from './controller/client.controller'
import { ProjectCateServerController } from './controller/server.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectCate]),
  ],
  providers: [ProjectCateService],
  controllers: [ProjectCateClientController, ProjectCateServerController]
})
export class ProjectCateModule {}

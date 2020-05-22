
import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { JobClientController } from './controller/client.controller'
import { JobServerController } from './controller/server.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
  ],
  providers: [JobService],
  controllers: [JobClientController, JobServerController]
})
export class JobModule {}

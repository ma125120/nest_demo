
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordClientController } from './controller/client.controller'
import { RecordServerController } from './controller/server.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
  ],
  providers: [RecordService],
  controllers: [RecordClientController, RecordServerController]
})
export class RecordModule {}

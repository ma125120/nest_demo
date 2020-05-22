import { Module } from '@nestjs/common'
import { CateResourceService } from './cateResource.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CateResource } from './cateResource.entity'
import { CateResourceClientController } from './controller/client.controller'
import { CateResourceServerController } from './controller/server.controller'
import { ProjectCate } from '@/projectCate/projectCate.entity'

@Module({
	imports: [TypeOrmModule.forFeature([ProjectCate, CateResource])],
	providers: [CateResourceService],
	controllers: [CateResourceClientController, CateResourceServerController],
})
export class CateResourceModule {}

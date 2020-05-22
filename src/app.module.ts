import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './common/filter/http-exception.filter'
import { AnyExceptionFilter } from './common/filter/any-exception.filter'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
// import { getDbConfig } from '../config/index';
// import { EventsModule } from './events/events.module';
import dayjs = require('dayjs')
import { ConfigModule } from '@nestjs/config'
import { JobModule } from './job/job.module'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as nuid from 'nuid'
import { ProjectCateModule } from './projectCate/projectCate.module'
import { CateResourceModule } from './cateResource/cateResource.module'
import { RecordModule } from './record/record.module'

enum EnvEnum {
	dev = 'dev',
	prod = 'prod',
}

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${EnvEnum[process.env.MY_ENV]}.env`,
		}),
		TypeOrmModule.forRoot({
			type: (process.env.DB_TYPE as any) || 'mysql',
			host: (process.env.DB_HOST as any) || 'localhost',
			port: (process.env.DB_PORT as any) || 3306,
			username: (process.env.DB_USERNAME as any) || 'root',
			password: (process.env.DB_PASSWORD as any) || '123456',
			database: (process.env.DB_NAME as any) || 'yuyan_admin',
			synchronize: true,
			entities: ['dist/**/*.entity{.ts,.js}'],
			autoLoadEntities: true,
			cli: {
				migrationsDir: 'migration',
			},
		}),
		MulterModule.register({
			// dest: './upload',
			storage: diskStorage({
				// 配置文件上传后的文件夹路径
				destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
				filename: (req, file, cb) => {
					// 在此处自定义保存后的文件名称
					const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`
					return cb(null, filename)
				},
			}),
		}),
		UserModule,
		JobModule,
		ProjectCateModule,
		CateResourceModule,
		RecordModule,
		// PaperModule,

		// EventsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AnyExceptionFilter,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}

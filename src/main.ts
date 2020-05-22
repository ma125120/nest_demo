import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import TransformInterceptor from './common/interceptor/transform'
import { ValidationPipe } from './common/pipe/validation.pipe'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
// import { RedisIoAdapter } from './common/adapter/socket.redis.adapter'
import * as express from 'express'
import { join } from 'path'

const PORT = process.env.PORT || 3001

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: process.env.MY_ENV === 'dev',
	})

	// 配置 public 文件夹为静态目录，以达到可直接访问下面文件的目的
	const rootDir = join(__dirname, '../..')

	app.use('/public', express.static(join(rootDir, 'public'), { maxAge: '2h' }))

	const options = new DocumentBuilder()
		.setTitle('期刊')
		.setDescription('期刊的API文档')
		.setVersion('1.0')
		// .addTag('cats')
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('doc', app, document)

	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalPipes(new ValidationPipe())
	// app.useWebSocketAdapter(new RedisIoAdapter(app));

	await app.listen(PORT || 3001)
	console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()

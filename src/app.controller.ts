import {
	Controller,
	Get,
	Headers,
	UnauthorizedException,
	Post,
	UseInterceptors,
	UploadedFile,
	Delete,
	Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'
import path = require('path')
import fs = require('fs')

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Post('/end/file/upload')
	@UseInterceptors(FileInterceptor('file'))
	upload(@UploadedFile() file) {
		const { filename, path } = file
		return { filename, path }
	}

	@Get('/_init')
	async init(@Headers('name') name: string) {
		if (name !== 'yuyan_init') {
			throw new UnauthorizedException('权限认证失败，无法初始化')
		}
		await this.appService.init()
		return '完成'
	}

	@Delete('/end/file')
	async deleteFile(@Query('url') url: string) {
		if (/^public[\/\\]uploads/g.test(url)) {
			const realPath = path.resolve(__dirname, `../../`, url)
			fs.unlink(realPath, (err) => {
				console.log(err)
			})
		}
	}

	// @Get('/name/set')
	// setName(@Query('name') name) {
	//   return this.appService.setName(name);
	// }

	// @Get('/name/get')
	// getName(): Promise<string> {
	//   return this.appService.getName();
	// }
}

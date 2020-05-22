import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	Put,
	UseGuards,
	Request,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { UserService } from '../user.service'
import { CreateUserDto, UserDto, UserLoginDto } from '../dto/index.dto'
import { UserRes } from '../dto/res'
import { User } from '../user.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
import { AuthSuper } from '@/common/decorator/auth'
import { UseUserInterceptor } from '../user.interceptor'

@UseUserInterceptor()
@ApiTags('客户端user接口')
@Controller('api/user')
export class UserClientController {
	constructor(
		private readonly service: UserService, // private readonly authService: AuthService,
	) {}

	@ApiOperation({
		summary: '新建user',
		description: '新建user',
	})
	@ApiResponse({
		type: UserRes,
		status: 201,
	})
	@Post()
	create(@Body() body: CreateUserDto): Promise<User> {
		return this.service.create(body)
	}

	@ApiOperation({
		summary: '更新user',
		description: '更新user',
	})
	@ApiResponse({
		type: UserRes,
		status: 201,
	})
	@Put()
	update(@Body() body: UserDto): Promise<User> {
		return this.service.update(body)
	}

	@ApiOperation({
		summary: '登录',
		description: '登录',
	})
	@ApiResponse({
		status: 200,
		description: 'user',
		type: UserRes,
	})
	@Post('login')
	async login(@Body() body: UserLoginDto): Promise<UserDto> {
		const res = await this.service.login(body.username, body.password)
		delete res.password
		delete res.delete_time

		return res as UserDto
	}

	@UseGuards(JwtAuthGuard)
	@Get('config')
	getProfile(@Request() req) {
		return req.user
	}

	@AuthSuper()
	@Get('test')
	testAauth(@Request() req) {
		return req.user
	}

	@ApiOperation({
		summary: '根据id查询user',
		description: '根据id查询user',
	})
	@ApiResponse({
		status: 200,
		description: 'user',
		type: UserRes,
	})
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	find(@Param('id') id: string, @Request() req): Promise<User> {
		if (req.user?.id != id) throw new UnauthorizedException(`不要查询他人信息`)

		return this.service.findOne(id)
	}

	// @ApiOperation({
	// 	summary: '修改密码',
	// 	description: '修改密码',
	// })
	// @ApiResponse({
	// 	status: 200,
	// 	description: 'user',
	// 	type: UserRes,
	// })
	// @UseGuards(JwtAuthGuard)
	// @Post('changePwd')
	// changePwd(@Body() body: UserDto): Promise<User> {
	// 	return this.service.changePwd(body)
	// }

	@Delete(':id')
	delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id)
	}
}

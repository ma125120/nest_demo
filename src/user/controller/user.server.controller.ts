import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	Put,
	Request,
	Query,
	UseGuards,
} from '@nestjs/common'
import { UserService } from '../user.service'
import { CreateUserDto, UserDto, UserLoginDto } from '../dto/index.dto'
import { UserRes, UserPageRes } from '../dto/res'
import { User } from '../user.entity'
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'
import { AuthAdmin, AuthSuper } from '@/common/decorator/auth'
import { PageDto } from '@/common/types/page.dto'
import { UseUserInterceptor } from '../user.interceptor'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'

@UseUserInterceptor()
@ApiTags('服务端user接口')
@Controller('end/user')
export class UserServerController {
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
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() body: CreateUserDto, @Request() req): Promise<User> {
		return this.service.create(body, req.user)
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
		summary: '查询所有user',
		description: '查询所有user',
	})
	@ApiResponse({
		status: 200,
		description: 'user数组',
		// isArray: true,
		type: UserPageRes,
	})
	@Get()
	findAll(@Query() query: PageDto) {
		return this.service.findAll(query)
	}

	@Get('/all')
	findAllWithDelete(): Promise<User[]> {
		return this.service.findAllWithDelete()
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
	// @Auth()
	@Post('login')
	async login(@Body() body: UserLoginDto): Promise<UserDto> {
		const res = await this.service.loginAdmin(body.username, body.password)

		return res as UserDto
	}

	@ApiOperation({
		summary: '根据token获取个人信息',
		description: '根据token获取个人信息',
	})
	@ApiResponse({
		status: 200,
		description: 'user',
		type: UserRes,
	})
	@AuthAdmin()
	@Get('info')
	getInfo(@Request() req) {
		const user = req.user
		return this.service.findOne(user?.id)
	}

	// @UseGuards(JwtAuthGuard)
	@AuthAdmin()
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
	@Get(':id')
	find(@Param('id') id: string): Promise<User> {
		return this.service.findOne(id)
	}

	@Delete(':id')
	delete(@Param('id') id: string): Promise<void> {
		return this.service.delete(id)
	}

	@Delete(`/real/:id`)
	deleteReal(@Param('id') id: string): Promise<void> {
		return this.service.deleteReal(id)
	}

	@ApiOperation({
		summary: '修改密码',
		description: '修改密码',
	})
	@ApiResponse({
		status: 200,
		description: 'user',
		type: UserRes,
	})
	@Post('changePwd')
	changePwd(@Body() body: UserDto): Promise<User> {
		return this.service.changePwd(body)
	}
}

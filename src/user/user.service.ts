import {
	Injectable,
	UnauthorizedException,
	HttpException,
} from '@nestjs/common'
import { User, Role } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto, UserDto } from './dto/index.dto'
import { sha1 } from '@/common/util/index'
import { AuthService } from '@/auth/auth.service'
// import { UserTransformData } from './user.guard';
import { PageDto, toPage } from '@/common/types/page.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly repo: Repository<User>,
		// @Inject(forwardRef(() => AuthService))
		private authService: AuthService,
	) {}

	create(body: CreateUserDto, cacheUser: any = null): Promise<User> {
		// 带过来的token解析出来的user, 角色权限 > 创建用户的权限时，权限不足
		if (cacheUser && cacheUser.role > body.role) {
			throw new HttpException(`权限不足`, 402)
		}
		const user = body as User
		user.password = sha1(user.password)

		return this.repo.save(user)
	}
	async createAdmin(body: CreateUserDto) {
		let user = body as User
		const _user = await this.repo.findOne({
			where: {
				username: body.username,
			},
		})
		if (_user) {
			user = {
				..._user,
				...user,
			} as any
		}

		user.password = sha1(user.password)

		return this.repo.save(user)
	}

	async findAll(params: PageDto) {
		// const builder = this.repo.createQueryBuilder('user');
		// return builder.leftJoinAndSelect('user.papers', 'paper').take(1).skip(1).getManyAndCount();

		return this.repo.findAndCount(toPage(params))
	}

	async findAllWithDelete(): Promise<User[]> {
		const builder = this.repo.createQueryBuilder()
		return builder.withDeleted().getMany()
	}

	findOne(id: string): Promise<User> {
		return this.repo.findOne(id)
	}

	async delete(id: string): Promise<void> {
		await this.repo.softDelete(id)
	}

	async deleteReal(id: string): Promise<void> {
		await this.repo.delete(id)
	}

	async update(body: UserDto) {
		const user = body as User
		delete user.password
		return this.repo.save(user)
	}

	async login(username: string, password: string): Promise<UserDto> {
		const res = (await this.repo.findOne({
			where: {
				username: username,
				password: sha1(password),
			},
		})) as UserDto
		if (!res) {
			throw new HttpException('用户名或者密码不正确', 402)
		}

		if (res) {
			return {
				token: this.authService.login(res),
				...res,
			}
		}

		return res
	}

	async loginAdmin(username: string, password: string): Promise<UserDto> {
		const res = (await this.login(username, password)) as UserDto
		if (res.role === Role.user) {
			throw new UnauthorizedException('普通用户无权登录后台管理系统')
		}

		return res
	}

	async changePwd(body: UserDto) {
		const password = sha1(body.password)

		const user = await this.repo.findOne({
			where: {
				username: body.username,
				password,
			},
		})

		if (!user) {
			throw new HttpException('用户名或密码不正确', 501)
		}
		const pwd1 = sha1(body['pwd'])
		if (pwd1 === password) {
			throw new HttpException('新密码与原密码一致，无需更改', 502)
		}
		user.password = pwd1
		return this.repo.save(user)
	}
}

export class UserModule {}

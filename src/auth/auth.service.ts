import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}

	async validateUser(username: string, password: string): Promise<any> {
		// return this.userService._login(username, password);
		if (username === 'admin' && password === '123456') {
			return true
		}
		return true
	}

	login(user: any) {
		if (!user) return ''
		// eslint-disable-next-line
		const { password, ...payload } = user
		// const payload = { username: user.username, sub: user.userId || 1, role: user.role, };
		return this.jwtService.sign(payload)
	}
}

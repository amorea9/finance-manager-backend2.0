import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async upgrade(userId: number) {
    return this.usersService.upgrade(userId);
  }

  async signup(user: any) {
    return this.usersService.create(user.email, user.password);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    // console.log("user found", user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log('user found removed password', password);

      return result;
    }
    return null;
  }

  async login(user: any) {
    const userFromDb = await this.usersService.findOne(user.email);

    const payload = {
      email: user.email,
      id: userFromDb.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

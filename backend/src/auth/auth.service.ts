import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email, status: true },
      select: {
        email: true,
        username: true,
        role: true,
        password: true,
        id: true,
      }, //! OJO!
    });

    if (!user)
      throw new UnauthorizedException(
        'Your credentials are incorrect! Please try again!',
      );

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Your credentials are incorrect! Please try again!',
      );

    const { password: p, ...rest } = user;

    return {
      user: rest,
      token: this.getJwtToken({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  async checkAuthStatus(user: User) {
    const userDB = await this.userRepository.findOne({
      where: { id: user.id, status: true },
      select: { email: true, id: true, username: true, role: true },
    });

    if (!userDB)
      throw new UnauthorizedException(
        'Your credentials are incorrect! Please try again!',
      );
    return {
      user: userDB,
      token: this.getJwtToken({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException(
      'Something went wrong. Please contact the admin.',
    );
  }
}

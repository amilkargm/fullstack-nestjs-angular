import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginUserDto } from './dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    // Constructor logic can be added here if needed
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    // Logic for handling login requests
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}

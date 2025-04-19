import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { TokenExpiredErrorFilter } from '../filters/token-exception.filter';

@Controller({ path: 'api/auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @UseFilters(TokenExpiredErrorFilter)
  @Post('/verify-token')
  async verifyToken(@Body() { token }: { token: string }) {
    return this.authService.verifyToken(token);
  }

  @UseFilters(TokenExpiredErrorFilter)
  @Post('/regen-token')
  async regenerateJwtToken(@Body() { refreshToken }: { refreshToken: string }) {
    return this.authService.regenerateJwtToken(refreshToken);
  }
}

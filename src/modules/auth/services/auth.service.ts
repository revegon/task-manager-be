import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from '../dto/register.dto';
import { UserRole } from 'src/modules/user/constants/user-role';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(req: LoginDto) {
    const user = await this.userService.findByUsername(req.username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(req.password, user.password);
      if (isPasswordValid) {
        return this.generateToken(user);
      } else {
        throw new UnauthorizedException('Invalid Credential!');
      }
    } else {
      throw new UnauthorizedException('Invalid Credential!');
    }
  }

  async register(req: RegisterDto) {
    if (req.password !== req.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const user = await this.userService.findByUsername(req.username);
    if (!user) {
      const hashedPassword = await bcrypt.hash(req.password, 4);
      const savedUser = await this.userService.create({
        username: req.username,
        password: hashedPassword,
        role: UserRole.REGULAR,
      });
      return this.generateToken(savedUser);
    } else {
      throw new BadRequestException('Username already exists');
    }
  }

  protected generateToken(user: User) {
    const data = {
      username: user.username,
    };
    return {
      username: user.username,
      role: user.role,
      accessToken: this.jwtService.sign(data),
      refreshToken: this.jwtService.sign(data, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
    };
  }

  async verifyToken(token: string) {
    try {
      const { username } = this.jwtService.verify(token);
      const user = await this.userService.findByUsername(username);
      if (user) {
        return {
          role: user.role,
        };
      } else {
        throw new UnauthorizedException('Invalid Token');
      }
    } catch (e) {
      if (
        e instanceof TokenExpiredError ||
        e instanceof UnauthorizedException
      ) {
        throw e;
      } else {
        throw new UnauthorizedException('Invalid Token');
      }
    }
  }

  async regenerateJwtToken(refreshToken: string) {
    const { username } = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
    });
    const user = await this.userService.findByUsername(username);
    if (user) {
      return {
        username: user.username,
        role: user.role,
        accessToken: this.jwtService.sign({
          username: user.username,
        }),
      };
    } else {
    }
  }
}

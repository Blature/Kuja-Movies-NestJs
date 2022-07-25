import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    try {
      const user = await this.usersRepository.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: JwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        this.logger.verbose(`"${username}" logged in!`);
        return { accessToken };
      } else {
        throw new UnauthorizedException(
          'Please check your login credentials !',
        );
      }
    } catch (err) {
      this.logger.error(
        `We have an err: "${err.message}" with code: "${err.code}"`,
      );
    }
  }
}

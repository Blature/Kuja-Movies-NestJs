import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const logger = new Logger('UsersRepository');
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
      logger.verbose(`"${username}" Just Created!`);
    } catch (error) {
      if (error.code === '23505') {
        logger.warn(`"${username}" Already Exist`);
        throw new ConflictException(`${username} as User already Exist!`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

import { IsEnum } from 'class-validator';
import { UserRolls } from '../user-roll.enum';

export class UserRollValidatorDto {
  @IsEnum(UserRolls)
  roll: UserRolls;
}

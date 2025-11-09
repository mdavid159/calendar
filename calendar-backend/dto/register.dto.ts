import { IsString } from 'class-validator';

export class RegisterPageDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  birthDate: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}

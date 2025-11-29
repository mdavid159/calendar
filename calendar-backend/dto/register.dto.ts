import { IsDate, IsEmail, IsString } from 'class-validator';

export class RegisterPageDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

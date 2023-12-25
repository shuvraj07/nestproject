/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
    readonly password: any;

  @IsNotEmpty()
  @IsEmail()
    readonly email: string;
  }
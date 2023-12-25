/* eslint-disable prettier/prettier */
// Example DTO
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
    readonly username: string;
    @IsNotEmpty()
    readonly password: any;

  @IsNotEmpty()
  @IsEmail()
    readonly email: string;
  }
  
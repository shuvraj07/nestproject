/* eslint-disable prettier/prettier */
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      console.log(users)
      return users;
    } catch (error) {
      console.error('Error fetching users from the database:', error);
      throw error;
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new Error('Username is already taken');
      }

      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);

      return 'User successfully registered';
    } catch (error) {
      console.error('User registration failed:', error);
      return 'Registration failed: ' + error.message;
    }
  }
}

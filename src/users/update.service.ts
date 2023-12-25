/* eslint-disable prettier/prettier */
// update.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dto/user.dto'; // Use the same DTO as for creation

@Injectable()
export class UpdateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateEntityById(id: number, updateUserDto: CreateUserDto): Promise<User> {
    try {
      const entity = await this.userRepository.findOne({ where: { id } });

      if (!entity) {
        throw new NotFoundException(`Entity with ID ${id} not found`);
      }

      // Update the entity with the provided data from the DTO
     entity.username = updateUserDto.username;
     entity.email = updateUserDto.email;
      // Update other fields as needed

      // Save the updated entity
      const updatedEntity = await this.userRepository.save(entity);

      console.log(`Updating entity with ID ${id}`);
      
      return updatedEntity;
    } catch (error) {
      console.error('Error updating entity:', error);
      throw error;
    }
  }
}

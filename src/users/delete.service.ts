/* eslint-disable prettier/prettier */
// delete.service.ts
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class DeleteService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Example method to delete an entity by ID
  async deleteEntityById(id: number): Promise<void> {
    try {
      const entity = await this.userRepository.findBy({ id });
      console.log(entity)

      if (!entity || entity.length ==0) {
        throw new NotFoundException(`Entity with ID ${id} not found`);
      }

      console.log(await this.userRepository.remove(entity));

      console.log(`Deleting entity with ID from ${id}`);
    } catch (error) {
      console.error('Error deleting entity:', error);
      throw error;
    }
  }
}

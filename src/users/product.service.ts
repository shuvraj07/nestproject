/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './product.entity';
import { CreateUserInput, UserType } from 'src/schema/graph';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User | undefined> {
    const numericId: number = parseInt(id, 10);
    const outcome =  await this.userRepository.findOne({ where: { id: numericId } });
   // console.log(outcome)

  return outcome
  }
   

  async registerUser(input: CreateUserInput): Promise<User> {
    // Ensure to hash the password securely before saving it to the database
    const user = this.userRepository.create({
      //id: input.id,
      name: input.name,
      description: input.description,
      category: input.category,
      price:input.price
    });
    //console.log(user)

    return await this.userRepository.save(user);
  }

  async updateUser(id: string, input: CreateUserInput): Promise<User> {
    const numericId: number = parseInt(id, 10);
    const user = await this.userRepository.findOne({ where: { id: numericId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Update user details
    user.name = input.name;
    user.description = input.description;
    user.category = input.category;
    user.price = input.price;

    return await this.userRepository.save(user);


  }
  

  async deleteUser(id: string): Promise<User | undefined> {
    const numericId: number = parseInt(id, 10);
  
    // Find the user before deleting
    const userToDelete = await this.userRepository.findOne({ where: { id: numericId } });
    console.log("this is before delted ",userToDelete)
  
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found in the database`);
    }
  
    // Delete the user
    await this.userRepository.remove(userToDelete);
    //console.log("succefully delete the id", userToDelete.id)
  
    // Log the deleted message
    //console.log('Deleted user:', userToDelete);
  
    return userToDelete
  }
}


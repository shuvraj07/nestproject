/* eslint-disable prettier/prettier */
// user.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserInput, UserType } from 'src/schema/graph';
import { UserService } from './product.service';



@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserType)
  async getUser(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => UserType)
  async createUser(@Args('input') input: CreateUserInput) {
    console.log(input)
    return this.userService.registerUser(input);
  }

  @Mutation(() => UserType)
  async updateUser(@Args('id') id: string, @Args('input') input: CreateUserInput) {
    console.log(id)
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => UserType)
  async deleteUser(@Args('id') id: string) {
    const result = await this.userService.deleteUser(id);
    console.log(result)
    console.log("succefully delted the id ",result.id,"this is resut ",result)
    return 'User deleted successfully'; //
}
}

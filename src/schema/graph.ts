/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  
  @Field()
  price: number;

  @Field()
  category: string;
}
@InputType()
export class CreateUserInput {

  @Field()
  name: string;


  @Field()
  description: string;

  
  @Field()
  price: number;

  @Field()
  category: string;
}
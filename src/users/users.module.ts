/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { UserController } from 'src/app.controller';
import { UserService } from './register.services';

@Module({
    //imports : [UserService],
  // controllers: [UserController],
 // providers: [UserService], // Include the UserService in the providers array
   // exports: [UserService], // Export the UserService so it can be used in other modules
  })
export class UsersModule {
    constructor() {
        console.log('This is user module ');
    }
}

/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { AppController, ExampleController, SampleController, UpdateController, YourController, } from './users/naya/app.controller';
//import { UsersModule } from './users/users.module';
//import { UserService } from './users/test.module';
//import { UsersModule } from './users/users.module';
import { YourModule } from './db/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { UserService } from './users/user.service';
//import { YourModule } from './db/data.module';
//import { UsersModule } from './users/users.module';
import { User } from './users/product.entity';
//import { UserService } from './users/naya/register.services';
// import { DeleteService } from './users/naya/delete.service';
// import { UpdateService } from './users/naya/update.service';
// import { AuthService } from './users/naya/auth.services';
// import { AuthController } from './users/naya/app.controller';
// import { JwtModule } from '@nestjs/jwt';
 import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtAuthGuard } from './users/naya/sign.guards';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './users/naya/local.strategy';
// import { AppService } from './users/naya/app.services';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './users/product.resolver';
import { UserService } from './users/product.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

//import { ApolloDriverConfig, ApolloDriver } from '@nestjs/graphql';
@Module({
  imports: [
    //ConfigModule.forRoot(),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret:'your', // You can replace 'yourSecretKey' with your actual secret
    //   signOptions: { expiresIn: '60s' },
    // }),
    // PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  YourModule],
  //controllers: [SampleController,UpdateController,AuthController,AppController,YourController,ExampleController],
  providers: [UserService,UserResolver],
})
export class RootModule {
  constructor() {
    console.log('the application runnting  and database conected succefully');
  }
}

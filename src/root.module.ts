/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController, SampleController, UpdateController, YourController, } from './app.controller';
//import { UsersModule } from './users/users.module';
//import { UserService } from './users/test.module';
//import { UsersModule } from './users/users.module';
import { YourModule } from './db/data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { UserService } from './users/user.service';
//import { YourModule } from './db/data.module';
//import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { UserService } from './users/register.services';
import { DeleteService } from './users/delete.service';
import { UpdateService } from './users/update.service';
import { AuthService } from './users/auth.services';
import { AuthController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationMiddleware } from './require.middleware';
import { JwtAuthGuard } from './sign.guards';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './local.strategy';
import { AppService } from './users/app.services';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:'your', // You can replace 'yourSecretKey' with your actual secret
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
  YourModule],
  controllers: [SampleController,UpdateController,AuthController,AppController,YourController],
  providers: [UserService,DeleteService,UpdateService,AuthService,JwtStrategy,AppService],
})
export class RootModule {
  constructor() {
    console.log('the application runnting  and database conected succefully');
  }
}

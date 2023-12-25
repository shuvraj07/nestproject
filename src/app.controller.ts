/* eslint-disable prettier/prettier */
// user.controller.ts
import { Body, Controller, Post,Request, ValidationPipe, Get, Delete,Param,Put,NotFoundException,UseGuards, Req,UseFilters,Res, ConsoleLogger, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserService } from './users/register.services';
import { DeleteService } from './users/delete.service';
import { UpdateService } from './users/update.service';
import { AuthService } from './users/auth.services';
import { LoginDto } from './dto/login.dto';
//import { RequireSigninMiddleware } from './require.middleware';
import { JwtAuthGuard } from './sign.guards';
import { AuthenticationMiddleware } from './require.middleware';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './users/app.services';
import { HttpExceptionFilter } from './exception.filter';



@Controller('sample')
export class SampleController {
  constructor(private readonly deleteService: DeleteService) {}

  @Delete(':id')
  async deleteEntity(@Param('id') id: number): Promise<{message:string}> {
    // Call the delete method from the service
    const data =  await this.deleteService.deleteEntityById(id);
    return {message: `This is delted from the list  ${id}`}
  }
   
  @Get()
  async hello(): Promise<number> {
    const data: number = 567;
    return data;
  }
  }




@Controller('update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Put(':id')
  async updateEntity(@Param('id') id: number, @Body() updateUserDto: CreateUserDto): Promise<User> {
    try {
      const updatedUser = await this.updateService.updateEntityById(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: CreateUserDto): Promise<string> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
@Controller()
export class YourController {
  @Get('protected')
  @UseGuards(JwtAuthGuard)
  @UseFilters(new HttpExceptionFilter())
  protectedRoute(@Req() req) {
    const user = req.user;

    // Your logic for the protected route
    // const responseData = {
    //   message: `Hello User with ID ${user.id}! This is a protected route.`,
    // };
return {messege: `helllo from teh user `}
   // res.status(200).json(responseData);
  }

  // Other routes...
}


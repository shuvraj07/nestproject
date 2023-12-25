/* eslint-disable prettier/prettier */
// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException, Logger,UseFilters } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import * as jwt from 'jsonwebtoken';
//import { JwtExceptionsFilter } from './exception.filter';


//@UseFilters(new JwtExceptionsFilter())
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your', // Replace with your actual secret key
    });
  }

  async validate(payload) {
    try {
      const { id } = payload;
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new UnauthorizedException('User not found.');
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        this.logger.error('Token has expired');
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        this.logger.error('Invalid token');
        throw new UnauthorizedException('Invalid token');
      } else {
        this.logger.error(`Error validating token: ${error.message}`);
        throw new UnauthorizedException('Unauthorized access from the ');
      }
    }
  }
}

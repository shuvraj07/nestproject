/* eslint-disable prettier/prettier */
import { Injectable,UseGuards,UseFilters } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from './exception.filter';


@Injectable()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

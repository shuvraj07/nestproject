/* eslint-disable prettier/prettier */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };

    if (exception instanceof HttpException) {
      const tokenExpiredError = exception.getResponse() instanceof jwt.TokenExpiredError;
      const jsonWebTokenError = exception.getResponse() instanceof jwt.JsonWebTokenError;

      if (tokenExpiredError) {
        const expiredToken = this.getExpiredToken(request);
        errorResponse.message = `Token has expired. Token: ${expiredToken}`;
      } else if (jsonWebTokenError) {
        errorResponse.message = 'Invalid token';
      }
    }

    response.status(status).json(errorResponse);
  }

  private getExpiredToken(request: Request): string | null {
    const authorizationHeader = request.headers['authorization'];
    if (authorizationHeader) {
      const tokenParts = authorizationHeader.split(' ');
      if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        return tokenParts[1];
      }
    }
    return null;
  }
}

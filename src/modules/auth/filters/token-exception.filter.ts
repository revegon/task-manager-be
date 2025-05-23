import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Catch(TokenExpiredError)
export class TokenExpiredErrorFilter implements ExceptionFilter {
  catch(exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(401).json({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Token has expired',
    });
  }
}

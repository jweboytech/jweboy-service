import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.OK;

    let message;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      // @ts-ignore
      message = res.message;
    } else {
      message = exception.message || 'Internal server error';
    }

    this.logger.error(`Request {${request.url}, ${status}} ${message}`);

    response.status(status).json({
      msg: message,
      code: status,
      data: null,
    });
  }
}

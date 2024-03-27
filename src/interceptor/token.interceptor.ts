// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from '../service/auth/constants';

// @Injectable()
// export class TokenInterceptor implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   async canActivate(context: ExecutionContext): Promise<any> {
//     const req = context.switchToHttp().getRequest();
//     console.log(req.headers);
//     const token = req.headers.authorization.split(' ')[1];
//     const user = await this.jwtService.verifyAsync(token, {
//       secret: jwtConstants.secret,
//     });
//     console.log('token interceptor', user);
//     req.query.userId = user.userId;
//     req.body.userId = user.userId;
//     return true;
//   }
// }

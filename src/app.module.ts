import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './module/user/user.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}

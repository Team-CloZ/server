import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './module/user/user.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PostModule } from './module/post/post.module';
import { AiModule } from './module/ai/ai.module';
import { AuthModule } from './module/auth/auth.module';
import { PapagoModule } from './module/papago/papago.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    PostModule,
    AiModule,
    AuthModule,
    PapagoModule,
  ],
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

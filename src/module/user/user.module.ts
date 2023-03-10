import { Post, User } from '@/entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, Post])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

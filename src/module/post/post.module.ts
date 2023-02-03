import { Post, PostLike, User } from '@/entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [MikroOrmModule.forFeature([Post, User, PostLike])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

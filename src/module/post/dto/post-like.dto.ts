import { PostLike, User } from '@/entity';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PostLikeByPostIdReqBodyDto extends PickType(PostLike, [
  'userId',
]) {}

@Exclude()
export class PostLikeByPostIdResDto extends PickType(User, ['id']) {
  @Expose() readonly id!: number;
}

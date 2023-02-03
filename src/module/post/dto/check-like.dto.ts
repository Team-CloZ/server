import { PostLike } from '@/entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CheckLikeByPostIdAndUserIdReqQueryDto extends PickType(PostLike, [
  'userId',
]) {}

export class CheckLikeByPostIdAndUserIdResDto {
  @ApiProperty()
  readonly isLiked!: boolean;
}

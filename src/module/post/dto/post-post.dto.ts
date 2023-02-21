import { Post } from '@/entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PostPostReqBodyDto extends IntersectionType(
  PickType(Post, [
    'imageUrl',
    'title',
    'color',
    'desc',
    'userId',
    'tlTitle',
    'tlColor',
    'tlDesc',
  ]),
  PartialType(PickType(Post, ['caption', 'parentId'])),
) {}

@Exclude()
export class PostPostResDto extends PickType(Post, ['id']) {
  @Expose() readonly id: number;
}

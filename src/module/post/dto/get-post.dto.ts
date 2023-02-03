import { Post, User } from '@/entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PostPostReqParamDto extends PickType(Post, ['id']) {}

@Exclude()
export class GetPostResParentDto extends PickType(Post, [
  'id',
  'imageUrl',
  'title',
  'color',
  'desc',
  'caption',
  'parentId',
  'userId',
  'likeCount',
]) {
  @Expose() readonly id!: number;
  @Expose() readonly imageUrl!: string;
  @Expose() readonly title!: string;
  @Expose() readonly color!: string;
  @Expose() readonly desc!: string;
  @Expose() readonly caption?: string;
  @Expose() readonly parentId?: number;
  @Expose() readonly userId!: number;
}

@Exclude()
export class GetPostResUserDto extends PickType(User, ['id', 'name']) {
  @Expose() readonly id!: number;
  @Expose() readonly name!: string;
}

@Exclude()
export class GetPostResDto extends PickType(Post, [
  'id',
  'imageUrl',
  'title',
  'color',
  'desc',
  'caption',
  'parentId',
  'userId',
  'likeCount',
]) {
  @Expose() readonly id!: number;
  @Expose() readonly imageUrl!: string;
  @Expose() readonly title!: string;
  @Expose() readonly color!: string;
  @Expose() readonly desc!: string;
  @Expose() readonly caption?: string;
  @Expose() readonly parentId?: number;
  @Expose() readonly userId!: number;
  @Expose() readonly likeCount!: number;

  @ApiProperty()
  @Expose()
  readonly parent?: GetPostResParentDto;

  @ApiProperty()
  @Expose()
  readonly user!: GetPostResUserDto;
}

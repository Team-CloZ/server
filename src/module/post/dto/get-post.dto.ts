import { Post, User } from '@/entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetPostByIdReqParamDto extends PickType(Post, ['id']) {}

@Exclude()
export class GetPostByIdResParentDto extends PickType(Post, [
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
export class GetPostByIdResUserDto extends PickType(User, [
  'id',
  'name',
  'image',
]) {
  @Expose() readonly id!: number;
  @Expose() readonly name!: string;
  @Expose() readonly image!: string;
}

@Exclude()
export class GetPostByIdResDto extends PickType(Post, [
  'id',
  'imageUrl',
  'title',
  'color',
  'desc',
  'tlTitle',
  'tlColor',
  'tlDesc',
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
  @Expose() readonly tlTitle!: string;
  @Expose() readonly tlColor!: string;
  @Expose() readonly tlDesc!: string;
  @Expose() readonly caption?: string;
  @Expose() readonly parentId?: number;
  @Expose() readonly userId!: number;
  @Expose() readonly likeCount!: number;

  @ApiProperty()
  @Expose()
  readonly parent?: GetPostByIdResParentDto;

  @ApiProperty()
  @Expose()
  readonly user!: GetPostByIdResUserDto;
}

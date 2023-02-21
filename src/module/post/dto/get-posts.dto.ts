import { Post } from '@/entity';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { SortBy } from '../enum';

export class GetPostsResQueryDto extends PartialType(
  PickType(Post, ['userId'] as const),
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({ required: false, default: 1 })
  @Type(() => Number)
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    enum: SortBy,
    required: false,
    default: SortBy.LATEST,
  })
  @IsEnum(SortBy)
  readonly sortBy: SortBy = SortBy.LATEST;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  readonly userId?: number;
}

@Exclude()
export class GetPostsResElementDto extends PickType(Post, [
  'id',
  'imageUrl',
  'title',
  'color',
  'desc',
  'caption',
  'likeCount',
  // 'parentId',
  // 'userId',
  // 'likeCount',
]) {
  @Expose() readonly id!: number;
  @Expose() readonly imageUrl!: string;
  @Expose() readonly title!: string;
  @Expose() readonly color!: string;
  @Expose() readonly desc!: string;
  @Expose() readonly caption?: string;
  @Expose() readonly likeCount!: number;
  // @Expose() readonly parentId?: number;
  // @Expose() readonly userId!: number;
  // @Expose() readonly likeCount!: number;
}

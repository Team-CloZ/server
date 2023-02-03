import { ApiProperty } from '@nestjs/swagger';

export class GetUserLikeCountByIdResDto {
  @ApiProperty()
  readonly likeCount!: number;
}

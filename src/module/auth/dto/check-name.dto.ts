import { User } from '@/entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CheckNameReqQeuryDto extends PickType(User, ['name']) {}

export class CheckNameResDto {
  @ApiProperty()
  readonly isExist!: boolean;
}

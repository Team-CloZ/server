import { User } from '@/entity';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetUserReqParamsDto extends PickType(User, ['id']) {}

@Exclude()
export class GetUserResDto extends PickType(User, ['id', 'name', 'image']) {
  @Expose() readonly id: number;
  @Expose() readonly name: string;
  @Expose() readonly image: string;
}

import { User } from '@/entity';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PostUserReqBodyDto extends PickType(User, ['name']) {}

@Exclude()
export class PostUserResDto extends PickType(User, ['id', 'name']) {
  @Expose() readonly id: number;
  @Expose() readonly name: string;
}

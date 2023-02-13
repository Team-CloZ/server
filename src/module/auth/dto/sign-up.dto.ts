import { User } from '@/entity';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class SignUpReqBodyDto extends PickType(User, ['name', 'password']) {}

@Exclude()
export class SignUpResDto extends PickType(User, ['id', 'name', 'image']) {
  @Expose() readonly id: number;
  @Expose() readonly name: string;
  @Expose() readonly image: string;
}

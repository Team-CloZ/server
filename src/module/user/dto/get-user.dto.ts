import { User } from '../../../entity';
import { PickType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetUserParamsDto extends PickType(User, ['id']) {}

@Exclude()
export class GetUserResDto extends PickType(User, ['id', 'name']) {
  @Expose() readonly id: number;
  @Expose() readonly name: string;
}

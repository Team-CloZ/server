import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IsKoReqBodyDto {
  @ApiProperty()
  @IsString()
  readonly text!: string;
}

export class IsKoResDto {
  @ApiProperty()
  readonly isKo!: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateImagesReqBodyDto {
  @ApiProperty()
  @IsString()
  readonly title!: string;

  @ApiProperty()
  @IsString()
  readonly color!: string;

  @ApiProperty()
  @IsString()
  readonly desc!: string;
}

export class CreateImagesResDto {
  @ApiProperty()
  images: string[];
}

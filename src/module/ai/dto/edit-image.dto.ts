import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsString } from 'class-validator';
import { CreateImagesReqBodyDto } from '.';

export class EditImageReqBodyDto {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty({ type: CreateImagesReqBodyDto })
  @IsNotEmptyObject()
  source: CreateImagesReqBodyDto;

  @ApiProperty({ type: CreateImagesReqBodyDto })
  @IsNotEmptyObject()
  target: CreateImagesReqBodyDto;
}

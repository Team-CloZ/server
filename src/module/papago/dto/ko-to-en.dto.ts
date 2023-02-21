import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class KoToEnReqBodyDto {
  @ApiProperty()
  @IsString()
  readonly text!: string;
}

export class KoToEnResDto {
  @ApiProperty()
  readonly translatedText!: string;
}

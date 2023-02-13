import { Body, Controller, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateImagesReqBodyDto,
  CreateImagesResDto,
  EditImageReqBodyDto,
} from './dto';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  @ApiOperation({ summary: '이미지 목록 생성' })
  @ApiCreatedResponse({ type: CreateImagesResDto })
  @Post()
  async createImages(
    @Body() createImagesReqBodyDto: CreateImagesReqBodyDto,
  ): Promise<CreateImagesResDto> {
    return {
      images: [
        Date.now() + '_1.jpg',
        Date.now() + '_2.jpg',
        Date.now() + '_3.jpg',
        Date.now() + '_4.jpg',
        Date.now() + '_5.jpg',
        Date.now() + '_6.jpg',
      ],
    };
    return fetch(`${process.env.AI_HOST}/v2/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createImagesReqBodyDto),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  @ApiOperation({ summary: '이미지 수정' })
  @ApiOkResponse({ type: CreateImagesResDto })
  @Patch()
  async editImage(
    @Body() editImageReqBodyDto: EditImageReqBodyDto,
  ): Promise<CreateImagesResDto> {
    return {
      images: [new Date() + '_7.jpg'],
    };
    return fetch(`${process.env.AI_HOST}/v2/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editImageReqBodyDto),
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  IsKoReqBodyDto,
  IsKoResDto,
  KoToEnReqBodyDto,
  KoToEnResDto,
} from './dto';

@ApiTags('papago')
@Controller('papago')
export class PapagoController {
  @ApiOperation({ summary: '언어 감지' })
  @ApiOkResponse({ type: IsKoResDto })
  @HttpCode(200)
  @Post('is-ko')
  async isKo(@Body() isKoReqBodyDto: IsKoReqBodyDto): Promise<IsKoResDto> {
    return fetch(`${process.env.PAPAGO_HOST}/v1/papago/detectLangs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': process.env.PAPAGO_ID,
        'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
      },
      body: `query=${isKoReqBodyDto.text}`,
    })
      .then((res) => res.json())
      .then((data) => {
        return { isKo: data.langCode === 'ko' };
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  @ApiOperation({ summary: '영어로 번역' })
  @ApiOkResponse({ type: KoToEnResDto })
  @HttpCode(200)
  @Post('ko-to-en')
  async koToEn(
    @Body() koToEnReqBodyDto: KoToEnReqBodyDto,
  ): Promise<KoToEnResDto> {
    return fetch(`${process.env.PAPAGO_HOST}/v1/papago/n2mt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': process.env.PAPAGO_ID,
        'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
      },
      body: `source=ko&target=en&text=${koToEnReqBodyDto.text}`,
    })
      .then((res) => res.json())
      .then((data) => {
        return { translatedText: data.message.result.translatedText };
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

import {
  Body,
  CACHE_MANAGER,
  Controller,
  Inject,
  Patch,
  Post,
  Get,
} from '@nestjs/common';
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
import { Cache } from 'cache-manager';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @ApiOperation({ summary: '이미지 목록 생성' })
  @ApiCreatedResponse({ type: CreateImagesResDto })
  @Post()
  async createImages(
    @Body() createImagesReqBodyDto: CreateImagesReqBodyDto,
  ): Promise<CreateImagesResDto> {
    const now = new Date();
    const generateQueue =
      (await this.cacheManager.get<number>('generateQueue')) ?? 0;
    await this.cacheManager.set('generateQueue', generateQueue + 1, 0);
    console.log(
      `[생성 시작] 현재 ${generateQueue + 1}명 생성중`,
      createImagesReqBodyDto,
    );

    // return new Promise((resolve) => setTimeout(resolve, 10000))
    //   .then(() => {
    //     return {
    //       images: [
    //         '20230129065410.jpg',
    //         '20230129065410.jpg',
    //         '20230129065410.jpg',
    //         '20230129065410.jpg',
    //         '20230129065410.jpg',
    //         '20230129065410.jpg',
    //       ],
    //     };
    //   })
    //   .finally(async () => {
    //     const generateQueue = await this.cacheManager.get<number>(
    //       'generateQueue',
    //     );
    //     console.log(now, `[끝나고] ${generateQueue - 1}명 생성중`);
    //     await this.cacheManager.set('generateQueue', generateQueue - 1, 0);
    //   });

    return fetch(`${process.env.AI_HOST}/v2/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createImagesReqBodyDto),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return data;
        } else {
          console.log(res);
          throw new Error('AI 서버 에러');
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(async () => {
        const end = new Date();
        const time = (end.getTime() - now.getTime()) / 1000;
        const generateQueue = await this.cacheManager.get<number>(
          'generateQueue',
        );
        await this.cacheManager.set('generateQueue', generateQueue - 1, 0);
        console.log(`[생성 끝] ${time} 소요`, createImagesReqBodyDto);
      });
  }

  @ApiOperation({ summary: '이미지 수정' })
  @ApiOkResponse({ type: CreateImagesResDto })
  @Patch()
  async editImage(
    @Body() editImageReqBodyDto: EditImageReqBodyDto,
  ): Promise<CreateImagesResDto> {
    const now = new Date();
    const editQueue = (await this.cacheManager.get<number>('editQueue')) ?? 0;
    await this.cacheManager.set('editQueue', editQueue + 1, 0);
    console.log(
      `[수정 시작] 현재 ${editQueue + 1}명 수정중`,
      editImageReqBodyDto,
    );

    // return new Promise((resolve) => setTimeout(resolve, 2000))
    //   .then(() => {
    //     return {
    //       images: ['20230129065410.jpg'],
    //     };
    //   })
    //   .finally(async () => {
    //     const editQueue = await this.cacheManager.get<number>('editQueue');
    //     await this.cacheManager.set('editQueue', editQueue - 1, 0);
    //   });

    return fetch(`${process.env.AI_HOST}/v2/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editImageReqBodyDto),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          return data;
        } else {
          console.log(res);
          throw new Error('AI 서버 에러');
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(async () => {
        const end = new Date();
        const time = (end.getTime() - now.getTime()) / 1000;
        const editQueue = await this.cacheManager.get<number>('editQueue');
        await this.cacheManager.set('editQueue', editQueue - 1, 0);
        console.log(`[수정 끝] ${time} 소요`, editImageReqBodyDto);
      });
  }

  @ApiOperation({ summary: '생성 대기중인 사람 수' })
  @ApiOkResponse({ type: Number })
  @Get('queue/generate')
  async getGenerateQueue(): Promise<number> {
    return this.cacheManager.get<number>('generateQueue') ?? 0;
  }

  @ApiOperation({ summary: '수정 대기중인 사람 수' })
  @ApiOkResponse({ type: Number })
  @Get('queue/edit')
  async getEditQueue(): Promise<number> {
    return this.cacheManager.get<number>('editQueue') ?? 0;
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PostPostReqDto, PostPostResDto } from './dto';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '게시글 생성' })
  @ApiCreatedResponse({ type: PostPostResDto })
  @Post()
  async PostPost(
    @Body() postPostReqDto: PostPostReqDto,
  ): Promise<PostPostResDto> {
    const post = await this.postService.PostPost(postPostReqDto);

    return plainToInstance(PostPostResDto, post);
  }
}

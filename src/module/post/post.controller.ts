import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetPostsResElementDto,
  GetPostsResQueryDto,
  PostPostReqDto,
  PostPostResDto,
} from './dto';
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

  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiOkResponse({ type: [GetPostsResElementDto] })
  @Get()
  async GetPosts(
    @Query() getPostsResQueryDto: GetPostsResQueryDto,
  ): Promise<GetPostsResElementDto[]> {
    const posts = await this.postService.GetPosts(getPostsResQueryDto);

    return plainToInstance(GetPostsResElementDto, posts);
  }
}

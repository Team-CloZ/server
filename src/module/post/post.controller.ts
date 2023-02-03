import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetPostResDto,
  GetPostResParentDto,
  GetPostResUserDto,
  GetPostsResElementDto,
  GetPostsResQueryDto,
  PostPostReqDto,
  PostPostReqParamDto,
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
  async postPost(
    @Body() postPostReqDto: PostPostReqDto,
  ): Promise<PostPostResDto> {
    const post = await this.postService.postPost(postPostReqDto);

    return plainToInstance(PostPostResDto, post);
  }

  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiOkResponse({ type: [GetPostsResElementDto] })
  @Get()
  async getPosts(
    @Query() getPostsResQueryDto: GetPostsResQueryDto,
  ): Promise<GetPostsResElementDto[]> {
    const posts = await this.postService.getPosts(getPostsResQueryDto);

    return plainToInstance(GetPostsResElementDto, posts);
  }

  @ApiOperation({ summary: '게시글 조회' })
  @ApiOkResponse({ type: GetPostResDto }) // 지워보기
  @Get(':id')
  async getPost(
    @Param() postPostReqParamDto: PostPostReqParamDto,
  ): Promise<GetPostResDto> {
    const post = await this.postService.getPostById(postPostReqParamDto);

    return plainToInstance(GetPostResDto, {
      ...post,
      user: plainToInstance(GetPostResUserDto, post.user),
      parent: plainToInstance(GetPostResParentDto, post.parent),
    });
  }
}

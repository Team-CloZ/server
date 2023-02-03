import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetPostByIdResDto,
  GetPostByIdResParentDto,
  GetPostByIdResUserDto,
  GetPostsResElementDto,
  GetPostsResQueryDto,
  PostPostReqBodyDto,
  GetPostByIdReqParamDto,
  PostPostResDto,
  CheckLikeByPostIdAndUserIdResDto,
  CheckLikeByPostIdAndUserIdReqQueryDto,
  PostLikeByPostIdResDto,
  PostLikeByPostIdReqBodyDto,
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
    @Body() postPostReqBodyDto: PostPostReqBodyDto,
  ): Promise<PostPostResDto> {
    const post = await this.postService.postPost(postPostReqBodyDto);

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
  @ApiOkResponse({ type: GetPostByIdResDto })
  @Get(':id')
  async getPostById(
    @Param() getPostByIdReqParamDto: GetPostByIdReqParamDto,
  ): Promise<GetPostByIdResDto> {
    const post = await this.postService.getPostById(getPostByIdReqParamDto);

    return plainToInstance(GetPostByIdResDto, {
      ...post,
      user: plainToInstance(GetPostByIdResUserDto, post.user),
      parent: plainToInstance(GetPostByIdResParentDto, post.parent),
    });
  }

  @ApiOperation({ summary: '게시글의 자식 게시글 조회' })
  @ApiOkResponse({ type: [GetPostsResElementDto] })
  @Get(':id/children')
  async getChildrenByPostId(
    @Param() getPostByIdReqParamDto: GetPostByIdReqParamDto,
  ): Promise<GetPostsResElementDto[]> {
    const posts = await this.postService.getChildrenByPostId(
      getPostByIdReqParamDto,
    );

    return plainToInstance(GetPostsResElementDto, posts);
  }

  @ApiOperation({ summary: '게시글 좋아요 클릭' })
  @ApiCreatedResponse()
  @Post(':id/like')
  async postLikeByPostId(
    @Param() getPostByIdReqParamDto: GetPostByIdReqParamDto,
    @Body() postLikeByPostIdReqBodyDto: PostLikeByPostIdReqBodyDto,
  ): Promise<void> {
    await this.postService.postLikeByPostId(
      getPostByIdReqParamDto,
      postLikeByPostIdReqBodyDto,
    );
  }

  @ApiOperation({ summary: '게시글 좋아요 확인' })
  @ApiOkResponse({ type: CheckLikeByPostIdAndUserIdResDto })
  @Get(':id/like')
  async checkLikeByPostIdAndUserId(
    @Param()
    getPostByIdReqParamDto: GetPostByIdReqParamDto,
    @Query()
    checkLikeByPostIdAndUserIdReqQueryDto: CheckLikeByPostIdAndUserIdReqQueryDto,
  ): Promise<CheckLikeByPostIdAndUserIdResDto> {
    const isLiked = await this.postService.checkLikeByPostIdAndUserId(
      getPostByIdReqParamDto,
      checkLikeByPostIdAndUserIdReqQueryDto,
    );

    return plainToInstance(CheckLikeByPostIdAndUserIdResDto, { isLiked });
  }
}

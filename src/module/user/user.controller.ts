import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetUserReqParamsDto,
  GetUserResDto,
  PostUserReqDto,
  PostUserResDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성' })
  @ApiCreatedResponse({ type: PostUserResDto })
  @Post()
  async postUser(
    @Body() postUserReqDto: PostUserReqDto,
  ): Promise<PostUserResDto> {
    const user = await this.userService.postUser(postUserReqDto);

    return plainToInstance(PostUserResDto, user);
  }

  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: GetUserResDto })
  @Get(':id')
  async getUser(
    @Param() getUserParamsDto: GetUserReqParamsDto,
  ): Promise<GetUserResDto> {
    const user = await this.userService.getUser(getUserParamsDto);

    return plainToInstance(GetUserResDto, user);
  }
}

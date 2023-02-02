import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetUserParamsDto,
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
  @ApiOkResponse({ type: PostUserResDto })
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
    @Param() getUserParamsDto: GetUserParamsDto,
  ): Promise<GetUserResDto> {
    const user = await this.userService.getUser(getUserParamsDto);

    return plainToInstance(GetUserResDto, user);
  }
}

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
  PostUserReqBodyDto,
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
    @Body() postUserReqBodyDto: PostUserReqBodyDto,
  ): Promise<PostUserResDto> {
    const user = await this.userService.postUser(postUserReqBodyDto);

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

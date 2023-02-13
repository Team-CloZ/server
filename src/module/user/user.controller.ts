import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  GetUserLikeCountByIdResDto,
  GetUserReqParamsDto,
  GetUserResDto,
} from './dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 조회' })
  @ApiOkResponse({ type: GetUserResDto })
  @Get(':id')
  async getUser(
    @Param() getUserParamsDto: GetUserReqParamsDto,
  ): Promise<GetUserResDto> {
    const user = await this.userService.getUser(getUserParamsDto);

    return plainToInstance(GetUserResDto, user);
  }

  @ApiOperation({ summary: '유저가 받은 총 좋아요 수 조회' })
  @ApiOkResponse({ type: GetUserLikeCountByIdResDto })
  @Get(':id/like')
  async getUserLikeCountById(
    @Param() getUserParamsDto: GetUserReqParamsDto,
  ): Promise<GetUserLikeCountByIdResDto> {
    const likeCount = await this.userService.getUserLikeCountById(
      getUserParamsDto,
    );

    return plainToInstance(GetUserLikeCountByIdResDto, { likeCount });
  }
}

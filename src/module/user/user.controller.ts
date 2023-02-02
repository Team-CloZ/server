import { User } from '@/entity';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PostUserReqDto, PostUserResDto } from './dto';
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
}

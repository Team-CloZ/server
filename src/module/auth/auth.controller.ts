import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import {
  CheckNameReqQeuryDto,
  CheckNameResDto,
  SignInReqBodyDto,
  SignInResDto,
  SignUpReqBodyDto,
  SignUpResDto,
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ type: SignUpResDto })
  @Post('sign-up')
  async signUp(
    @Body() signUpReqBodyDto: SignUpReqBodyDto,
  ): Promise<SignUpResDto> {
    const user = await this.authService.signUp(signUpReqBodyDto);

    console.log(`회원가입: ${user.name}(${user.id})`);

    return plainToInstance(SignUpResDto, user);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: SignInResDto })
  @HttpCode(200)
  @Post('sign-in')
  async signIn(
    @Body() signInReqBodyDto: SignInReqBodyDto,
  ): Promise<SignInResDto> {
    const user = await this.authService.signIn(signInReqBodyDto);

    console.log(`로그인: ${user.name}(${user.id})`);

    return plainToInstance(SignInResDto, user);
  }

  @ApiOperation({ summary: 'name 확인' })
  @ApiOkResponse({ type: CheckNameResDto })
  @Get('check-name')
  async checkName(
    @Query() checkNameReqQueryDto: CheckNameReqQeuryDto,
  ): Promise<CheckNameResDto> {
    const isExist = await this.authService.checkName(checkNameReqQueryDto);

    return plainToInstance(CheckNameResDto, { isExist });
  }
}

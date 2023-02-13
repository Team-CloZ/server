import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthService } from './auth.service';
import {
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

    return plainToInstance(SignUpResDto, user);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: SignInResDto })
  @Post('sign-in')
  async signIn(
    @Body() signInReqBodyDto: SignInReqBodyDto,
  ): Promise<SignInResDto> {
    const user = await this.authService.signIn(signInReqBodyDto);

    return plainToInstance(SignInResDto, user);
  }
}

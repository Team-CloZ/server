import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignInReqBodyDto, SignUpReqBodyDto } from './dto';
import { User } from '@/entity';
import { UserRepository } from '@/repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(signUpReqBodyDto: SignUpReqBodyDto): Promise<User> {
    try {
      const user = await this.userRepository.selectUserByName(
        signUpReqBodyDto.name,
      );
      if (user) {
        throw new ConflictException(
          `유저 ${signUpReqBodyDto.name}가 존재합니다.}`,
        );
      }

      const salt = await bcrypt.genSalt();
      const hashedLoginPw = await bcrypt.hash(signUpReqBodyDto.password, salt);

      const newUser = new User({
        ...signUpReqBodyDto,
        password: hashedLoginPw,
      });

      const id = await this.userRepository.insertUser(newUser);

      const createdUser = await this.userRepository.selectUserById(id);

      return createdUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signIn(signInReqBodyDto: SignInReqBodyDto): Promise<User> {
    try {
      const user = await this.userRepository.selectUserByName(
        signInReqBodyDto.name,
      );
      if (!user) {
        throw new NotFoundException(
          `유저 ${signInReqBodyDto.name}가 존재하지 않습니다.`,
        );
      }

      const isMatch = await bcrypt.compare(
        signInReqBodyDto.password,
        user.password,
      );
      if (!isMatch) {
        throw new NotFoundException('비밀번호가 일치하지 않습니다.');
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

import { User } from '@/entity';
import { UserRepository } from '@/repository';
import { Injectable } from '@nestjs/common';
import { GetUserReqParamsDto, PostUserReqDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async postUser(postUserReqDto: PostUserReqDto): Promise<User> {
    try {
      const newUser = new User(postUserReqDto);

      const id = await this.userRepository.insertUser(newUser);

      const user = await this.userRepository.selectUserById(id);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUser(getUserParamsDto: GetUserReqParamsDto): Promise<User> {
    try {
      const user = await this.userRepository.selectUserById(
        getUserParamsDto.id,
      );

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

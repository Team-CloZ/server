import { User } from '@/entity';
import { UserRepository } from '@/repository';
import { Injectable } from '@nestjs/common';
import { GetUserReqParamsDto, PostUserReqBodyDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async postUser(postUserReqBodyDto: PostUserReqBodyDto): Promise<User> {
    try {
      const newUser = new User(postUserReqBodyDto);

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

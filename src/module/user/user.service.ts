import { User } from '@/entity';
import { UserRepository } from '@/repository';
import { Injectable, Logger } from '@nestjs/common';
import { PostUserReqDto } from './dto';

@Injectable()
export class UserService {
  logger = new Logger('UserService');
  constructor(private readonly userRepository: UserRepository) {}

  async postUser(postUserReqDto: PostUserReqDto) {
    try {
      const newUser = new User({
        name: postUserReqDto.name,
      });

      const id = await this.userRepository.insertUser(newUser);

      const user = await this.userRepository.selectUserById(id);

      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }
}

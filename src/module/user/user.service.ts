import { User } from '@/entity';
import { PostRepository, UserRepository } from '@/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserReqParamsDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  async getUser(getUserReqParamsDto: GetUserReqParamsDto): Promise<User> {
    try {
      const user = await this.userRepository.selectUserById(
        getUserReqParamsDto.id,
      );
      if (!user) {
        throw new NotFoundException(
          `${getUserReqParamsDto.id}번 유저가 존재하지 않습니다.`,
        );
      }

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUserLikeCountById(
    getUserReqParamsDto: GetUserReqParamsDto,
  ): Promise<number> {
    try {
      const user = await this.userRepository.selectUserById(
        getUserReqParamsDto.id,
      );
      if (!user) {
        throw new NotFoundException(
          `${getUserReqParamsDto.id}번 유저가 존재하지 않습니다.`,
        );
      }

      const likeCount = await this.postRepository.selectUserLikeCountById(
        getUserReqParamsDto.id,
      );

      return likeCount;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

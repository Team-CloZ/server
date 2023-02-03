import { User } from '../../entity';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetUserParamsDto, PostUserReqDto } from './dto';

@Injectable()
export class UserService {
  logger = new Logger('UserService');
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async postUser(postUserReqDto: PostUserReqDto): Promise<User> {
    try {
      const user = new User({
        name: postUserReqDto.name,
      });

      await this.#insertUser(user);

      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getUser(getUserParamsDto: GetUserParamsDto): Promise<User> {
    try {
      const user = await this.#selectUserById(getUserParamsDto.id);

      return user;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async #insertUser(user: User): Promise<number> {
    const qb = this.userRepository.createQueryBuilder().insert().values(user);
    const {
      raw: { insertId },
    } = await qb.execute();

    return insertId;
  }

  async #selectUserById(id: number): Promise<User> {
    const qb = this.userRepository.createQueryBuilder().select('*');
    qb.where('id = :id', { id });

    const [user] = await qb.execute();

    return user;
  }
}

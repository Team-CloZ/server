import { Post } from '@/entity';
import { PostRepository, UserRepository } from '@/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PostPostReqDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async PostPost({
    userId,
    parentId,
    ...ReqDto
  }: PostPostReqDto): Promise<Post> {
    try {
      const user = await this.userRepository.selectUserById(userId);
      if (!user) {
        throw new NotFoundException(`${userId}번 유저가 존재하지 않습니다.`);
      }

      if (parentId) {
        const parent = await this.postRepository.selectPostById(parentId);
        if (!parent) {
          throw new NotFoundException(
            `${parentId}번 게시글이 존재하지 않습니다.`,
          );
        }
      }

      const newPost = new Post({
        userId,
        parentId,
        ...ReqDto,
      });

      const id = await this.postRepository.insertPost(newPost);

      const post = await this.postRepository.selectPostById(id);

      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

import { Post } from '@/entity';
import { PostRepository, UserRepository } from '@/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  GetPostResUserDto,
  GetPostsResQueryDto,
  PostPostReqDto,
  PostPostReqParamDto,
} from './dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async postPost(postPostReqDto: PostPostReqDto): Promise<Post> {
    try {
      const user = await this.userRepository.selectUserById(
        postPostReqDto.userId,
      );
      if (!user) {
        throw new NotFoundException(
          `${postPostReqDto.userId}번 유저가 존재하지 않습니다.`,
        );
      }

      if (postPostReqDto.parentId) {
        const parent = await this.postRepository.selectPostById(
          postPostReqDto.parentId,
        );
        if (!parent) {
          throw new NotFoundException(
            `${postPostReqDto.parentId}번 게시글이 존재하지 않습니다.`,
          );
        }
      }

      const newPost = new Post(postPostReqDto);

      const id = await this.postRepository.insertPost(newPost);

      const post = await this.postRepository.selectPostById(id);

      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPosts(getPostsResQueryDto: GetPostsResQueryDto): Promise<Post[]> {
    try {
      if (getPostsResQueryDto.userId) {
        const user = await this.userRepository.selectUserById(
          getPostsResQueryDto.userId,
        );
        if (!user) {
          throw new NotFoundException(
            `${getPostsResQueryDto.userId}번 유저가 존재하지 않습니다.`,
          );
        }
      }

      const posts = await this.postRepository.selectPosts(getPostsResQueryDto);

      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPostById(postPostReqParamDto: PostPostReqParamDto): Promise<Post> {
    try {
      const post = await this.postRepository.selectPostById(
        postPostReqParamDto.id,
      );
      if (!post) {
        throw new NotFoundException(
          `${postPostReqParamDto.id}번 게시글이 존재하지 않습니다.`,
        );
      }

      const user = await this.userRepository.selectUserById(post.userId);

      const parent =
        post.parentId &&
        (await this.postRepository.selectPostById(post.parentId));

      return {
        ...post,
        user,
        parent,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

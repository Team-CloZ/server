import { Post, PostLike } from '@/entity';
import {
  PostLikeRepository,
  PostRepository,
  UserRepository,
} from '@/repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GetPostsResQueryDto,
  PostPostReqBodyDto,
  GetPostByIdReqParamDto,
  CheckLikeByPostIdAndUserIdReqQueryDto,
  PostLikeByPostIdReqBodyDto,
} from './dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
    private readonly postLikeRepository: PostLikeRepository,
  ) {}

  async postPost(postPostReqBodyDto: PostPostReqBodyDto): Promise<Post> {
    try {
      const user = await this.userRepository.selectUserById(
        postPostReqBodyDto.userId,
      );
      if (!user) {
        throw new NotFoundException(
          `${postPostReqBodyDto.userId}번 유저가 존재하지 않습니다.`,
        );
      }

      if (postPostReqBodyDto.parentId) {
        const parent = await this.postRepository.selectPostById(
          postPostReqBodyDto.parentId,
        );
        if (!parent) {
          throw new NotFoundException(
            `${postPostReqBodyDto.parentId}번 게시글이 존재하지 않습니다.`,
          );
        }
      }

      const newPost = new Post(postPostReqBodyDto);

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

  async getPostById(
    getPostByIdReqParamDto: GetPostByIdReqParamDto,
  ): Promise<Post> {
    try {
      const post = await this.postRepository.selectPostById(
        getPostByIdReqParamDto.id,
      );
      if (!post) {
        throw new NotFoundException(
          `${getPostByIdReqParamDto.id}번 게시글이 존재하지 않습니다.`,
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

  async getChildrenByPostId(
    getPostByIdReqParamDto: GetPostByIdReqParamDto,
  ): Promise<Post[]> {
    try {
      const post = await this.postRepository.selectPostById(
        getPostByIdReqParamDto.id,
      );
      if (!post) {
        throw new NotFoundException(
          `${getPostByIdReqParamDto.id}번 게시글이 존재하지 않습니다.`,
        );
      }

      const children = await this.postRepository.selectChildrenByPostId(
        getPostByIdReqParamDto.id,
      );

      return children;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async postLikeByPostId(
    getPostByIdReqParamDto: GetPostByIdReqParamDto,
    postLikeByPostIdReqBodyDto: PostLikeByPostIdReqBodyDto,
  ): Promise<void> {
    try {
      const isLiked = await this.checkLikeByPostIdAndUserId(
        getPostByIdReqParamDto,
        postLikeByPostIdReqBodyDto,
      );

      if (isLiked) {
        const affectedRows =
          await this.postLikeRepository.deletePostLikeByPostIdAndUserId(
            getPostByIdReqParamDto.id,
            postLikeByPostIdReqBodyDto.userId,
          );

        if (affectedRows === 1) {
          await this.postRepository.decrementLikeCountByPostId(
            getPostByIdReqParamDto.id,
          );
        }
      } else {
        const postLike = new PostLike({
          userId: postLikeByPostIdReqBodyDto.userId,
          postId: getPostByIdReqParamDto.id,
        });

        const id = await this.postLikeRepository.insertPostLike(postLike);

        if (id) {
          await this.postRepository.incrementLikeCountByPostId(
            getPostByIdReqParamDto.id,
          );
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkLikeByPostIdAndUserId(
    getPostByIdReqParamDto: GetPostByIdReqParamDto,
    checkLikeByPostIdAndUserIdReqQueryDto: CheckLikeByPostIdAndUserIdReqQueryDto,
  ): Promise<boolean> {
    try {
      const post = await this.postRepository.selectPostById(
        getPostByIdReqParamDto.id,
      );
      if (!post) {
        throw new NotFoundException(
          `${getPostByIdReqParamDto.id}번 게시글이 존재하지 않습니다.`,
        );
      }

      const user = await this.userRepository.selectUserById(
        checkLikeByPostIdAndUserIdReqQueryDto.userId,
      );
      if (!user) {
        throw new NotFoundException(
          `${checkLikeByPostIdAndUserIdReqQueryDto.userId}번 유저가 존재하지 않습니다.`,
        );
      }

      const postLike =
        await this.postLikeRepository.selectPostLikeByPostIdAndUserId(
          getPostByIdReqParamDto.id,
          checkLikeByPostIdAndUserIdReqQueryDto.userId,
        );

      if (postLike) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

import { Post } from '@/entity';
import { GetPostsResQueryDto } from '@/module/post/dto';
import { SortBy } from '@/module/post/enum';
import { EntityRepository } from '@mikro-orm/mysql';

export class PostRepository extends EntityRepository<Post> {
  async insertPost(post: Post): Promise<number> {
    const qb = this.qb().insert({ ...post }); // Q1. 왜 이렇게 해야 하는가?

    const { insertId } = await qb.execute();

    return insertId;
  }

  // 불변하게 수정
  async selectPostById(id: number): Promise<Post> {
    const qb1 = this.qb().select('*').where(id);

    const [post] = await qb1.execute();

    return post;
  }

  async selectPosts(getPostsResQueryDto: GetPostsResQueryDto): Promise<Post[]> {
    const qb = this.qb().select('*');

    if (getPostsResQueryDto.search) {
      qb.andWhere({
        title: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
      qb.orWhere({
        color: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
      qb.orWhere({
        desc: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
    }

    if (getPostsResQueryDto.userId) {
      qb.andWhere({ userId: getPostsResQueryDto.userId });
    }

    switch (getPostsResQueryDto.sortBy) {
      case SortBy.POPULAR:
        qb.orderBy({ likeCount: 'DESC', id: 'DESC' });
        break;
      default:
        qb.orderBy({ id: 'DESC' });
    }

    qb.limit(100, (getPostsResQueryDto.page - 1) * 100);

    const posts = await qb.execute();

    return posts;
  }

  async selectChildrenByPostId(postId: number): Promise<Post[]> {
    const qb = this.qb()
      .select('*')
      .where({ parentId: postId })
      .orderBy({ id: 'DESC' });

    const posts = await qb.execute();

    return posts;
  }

  async incrementLikeCountByPostId(id: number): Promise<void> {
    const qb = this.qb();
    qb.update({ likeCount: qb.raw('like_count + 1') }).where(id);

    await qb.execute();
  }

  async decrementLikeCountByPostId(id: number): Promise<void> {
    const qb = this.qb();
    qb.update({ likeCount: qb.raw('like_count - 1') }).where(id);

    await qb.execute();
  }

  async selectUserLikeCountById(id: number): Promise<number> {
    let likeCount = 0;

    const qb = this.qb().select('like_count').where({ userId: id });

    const posts = await qb.execute();

    posts.forEach((post) => {
      likeCount += post.likeCount;
    });

    return likeCount;
  }
}

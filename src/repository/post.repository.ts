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

  async selectPostById(id: number): Promise<Post> {
    const qb = this.qb().select('*').where(id);

    const [user] = await qb.execute();

    return user;
  }

  async selectPosts(getPostsResQueryDto: GetPostsResQueryDto): Promise<Post[]> {
    const qb = this.qb().select('*');

    if (getPostsResQueryDto.userId) {
      qb.andWhere({ userId: getPostsResQueryDto.userId });
    }

    if (getPostsResQueryDto.search) {
      qb.orWhere({
        title: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
      qb.orWhere({
        color: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
      qb.orWhere({
        desc: { $like: `%${getPostsResQueryDto.search.trim()}%` },
      });
    }

    switch (getPostsResQueryDto.sortBy) {
      case SortBy.LIKE:
        qb.orderBy({ likeCount: 'DESC', id: 'DESC' });
        break;
      default:
        qb.orderBy({ id: 'DESC' });
    }

    qb.limit(10, (getPostsResQueryDto.page - 1) * 10);

    const posts = await qb.execute();

    return posts;
  }
}

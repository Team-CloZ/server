import { PostLike } from '@/entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class PostLikeRepository extends EntityRepository<PostLike> {
  async selectPostLikeByPostIdAndUserId(
    postId: number,
    userId: number,
  ): Promise<PostLike> {
    const qb = this.qb().select('*').where({ postId, userId });

    const [postLike] = await qb.execute();

    return postLike;
  }

  async insertPostLike(postLike: PostLike): Promise<number> {
    const qb = this.qb().insert({ ...postLike });

    const { insertId } = await qb.execute();

    return insertId;
  }

  async deletePostLikeByPostIdAndUserId(
    postId: number,
    userId: number,
  ): Promise<number> {
    const qb = this.qb().delete().where({ postId, userId });

    const { affectedRows } = await qb.execute();

    return affectedRows;
  }
}

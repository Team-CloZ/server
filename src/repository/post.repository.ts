import { Post } from '@/entity';
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
}

import { User } from '@/entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class UserRepository extends EntityRepository<User> {
  async insertUser(user: User): Promise<number> {
    const qb = this.qb().insert(user);
    const { insertId } = await qb.execute();

    return insertId;
  }

  async selectUserById(id: number): Promise<User> {
    const qb = this.qb().select('*');
    qb.where(id);
    const [user] = await qb.execute();

    return user;
  }
}

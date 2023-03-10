import { User } from '@/entity';
import { EntityRepository } from '@mikro-orm/mysql';

export class UserRepository extends EntityRepository<User> {
  async insertUser(user: User): Promise<number> {
    const qb = this.qb().insert(user);

    const { insertId } = await qb.execute();

    return insertId;
  }

  async selectUserById(id: number): Promise<User> {
    const qb = this.qb().select('*').where(id);

    const [user] = await qb.cache().execute();

    return user;
  }

  async selectUserByName(name: string): Promise<User> {
    const qb = this.qb().select('*').where({ name });

    const [user] = await qb.cache().execute();

    return user;
  }
}

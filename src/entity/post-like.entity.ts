import { PostLikeRepository } from '@/repository';
import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min } from 'class-validator';
import { Post, User } from '.';

@Entity({ customRepository: () => PostLikeRepository })
@Unique({ properties: ['user', 'post'] })
export class PostLike {
  @PrimaryKey()
  readonly id!: number;

  @Property()
  readonly createdAt = new Date();

  constructor(partial: Partial<PostLike>) {
    Object.assign(this, partial);
  }

  @ManyToOne(() => User)
  readonly user!: User;

  @ManyToOne(() => Post)
  readonly post!: Post;

  @ApiProperty()
  @Property({ persist: false })
  @Type(() => Number)
  @Min(1)
  readonly userId!: number;

  @ApiProperty()
  @Property({ persist: false })
  @Type(() => Number)
  @Min(1)
  readonly postId!: number;
}

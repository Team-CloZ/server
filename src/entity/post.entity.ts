import { PostRepository } from '@/repository';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Min } from 'class-validator';
import { User } from '.';

@Entity({ customRepository: () => PostRepository })
export class Post {
  @ApiProperty()
  @PrimaryKey()
  @Type(() => Number)
  @Min(1)
  readonly id!: number;

  @ApiProperty()
  @Property()
  @IsString()
  readonly imageUrl!: string;

  @ApiProperty()
  @Property()
  @IsString()
  readonly title!: string;

  @ApiProperty()
  @Property()
  @IsString()
  readonly color!: string;

  @ApiProperty()
  @Property()
  @IsString()
  readonly desc!: string;

  @ApiProperty({ required: false })
  @Property()
  @IsString()
  readonly caption?: string;

  @ApiProperty({ default: 0 })
  @Property()
  readonly likeCount: number = 0;

  @ApiProperty({ type: Date })
  @Property()
  readonly createdAt = new Date();

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  readonly user!: User;

  @ApiProperty({ type: Post })
  @ManyToOne(() => Post)
  readonly parent?: Post;

  @ApiProperty()
  @Property({ persist: false })
  @Min(1)
  readonly userId!: number;

  @ApiProperty({ required: false })
  @Property({ persist: false })
  @Min(1)
  readonly parentId?: number;

  @ApiProperty()
  @Property()
  @IsString()
  readonly tlTitle!: string;

  @ApiProperty()
  @Property()
  @IsString()
  readonly tlColor!: string;

  @ApiProperty()
  @Property()
  @IsString()
  readonly tlDesc!: string;

  @Property({ hidden: true })
  readonly isDeleted: boolean = false;
}

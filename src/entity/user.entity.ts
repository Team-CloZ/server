import { UserRepository } from '@/repository';
import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Min } from 'class-validator';
@Entity({ customRepository: () => UserRepository })
export class User {
  @ApiProperty()
  @PrimaryKey()
  @Type(() => Number)
  @Min(1)
  readonly id!: number;

  @ApiProperty()
  @Property()
  @Unique()
  @IsString()
  readonly name!: string;

  @ApiProperty({ type: Date })
  @Property()
  readonly createdAt = new Date();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

import { UserRepository } from '@/repository';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
@Entity({ customRepository: () => UserRepository })
export class User {
  @ApiProperty()
  @IsNumber()
  @PrimaryKey()
  readonly id!: number;

  @ApiProperty()
  @IsString()
  @Property()
  readonly name!: string;

  @ApiProperty({ type: Date })
  @Property()
  readonly createdAt = new Date();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

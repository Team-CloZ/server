import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @Type(() => Number)
  @Min(1)
  readonly id!: number;

  @ApiProperty()
  @Column()
  @IsString()
  readonly name!: string;

  @ApiProperty({ type: Date })
  @CreateDateColumn()
  readonly createdAt = new Date();

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

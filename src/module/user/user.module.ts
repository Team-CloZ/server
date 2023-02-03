import { User } from '../../entity';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class UserModule {}

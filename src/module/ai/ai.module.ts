import { CacheModule, Module } from '@nestjs/common';
import { AiController } from './ai.controller';

@Module({
  imports: [CacheModule.register()],
  controllers: [AiController],
})
export class AiModule {}

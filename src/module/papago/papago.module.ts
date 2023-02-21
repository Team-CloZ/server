import { Module } from '@nestjs/common';
import { PapagoController } from './papago.controller';

@Module({
  controllers: [PapagoController],
})
export class PapagoModule {}

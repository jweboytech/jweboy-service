import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedNote } from './entity/rednote.entity';
import { RednoteController } from './rednote.controller';
import { RednoteService } from './rednote.service';

@Module({
  imports: [TypeOrmModule.forFeature([RedNote])],
  controllers: [RednoteController],
  providers: [RednoteService],
})
export class RednoteModule {}

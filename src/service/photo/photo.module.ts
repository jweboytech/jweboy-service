import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { DatabaseModule } from '../../database/database.module';
import { photoProviders } from './photo.provider';
import { PhotoController } from './photo.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...photoProviders, PhotoService],
  controllers: [PhotoController],
  exports: [PhotoService],
})
export class PhotoModule {}

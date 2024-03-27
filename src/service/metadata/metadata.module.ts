import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { DatabaseModule } from 'src/database/database.module';
import { metadataProviders } from './metadata.provider';
import { MetadataController } from './metadata.controller';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [DatabaseModule, PhotoModule],
  providers: [...metadataProviders, MetadataService],
  controllers: [MetadataController],
})
export class MetadataModule {}

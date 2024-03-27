import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Metadata } from './entity/metadata.entity';

@Injectable()
export class MetadataService {
  constructor(
    @Inject('METADATA_REPOSITORY') private repository: Repository<Metadata>,
  ) {}

  findAll(): Promise<Metadata[]> {
    return this.repository.find();
  }

  save(dto: Metadata): Promise<Metadata> {
    return this.repository.save(dto);
  }

  findOneBy(dto: Partial<Metadata>): Promise<Metadata> {
    return this.repository.findOneBy(dto);
  }
}

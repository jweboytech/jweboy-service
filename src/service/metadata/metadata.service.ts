import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Metadata } from './entity/metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private repository: Repository<Metadata>,
  ) {}

  findAll(): Promise<Metadata[]> {
    return this.repository.find();
  }

  save(dto: Metadata): Promise<Metadata> {
    return this.repository.save(dto);
  }

  findOne(dto: Partial<Metadata>): Promise<Metadata> {
    return this.repository.findOneBy(dto);
  }
}

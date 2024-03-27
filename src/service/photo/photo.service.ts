import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entity/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    // return this.photoRepository.find({ relations: { metadata: true } });
    return this.photoRepository
      .createQueryBuilder('photo')
      .innerJoinAndSelect('photo.metadata', 'metadata')
      .getMany();
  }

  save(dto: Photo): Promise<Photo> {
    return this.photoRepository.save(dto);
  }

  findOne(dto: Partial<Photo>): Promise<Photo> {
    return this.photoRepository.findOneBy(dto);
  }
}

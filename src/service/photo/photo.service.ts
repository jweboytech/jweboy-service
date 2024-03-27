import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entity/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY') private photoRepository: Repository<Photo>,
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

  findOneBy(dto: Partial<Photo>): Promise<Photo> {
    return this.photoRepository.findOneBy(dto);
  }
}

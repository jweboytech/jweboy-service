import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificate } from './entity/certificate.entity';
import { Repository } from 'typeorm';
import { AddCertDto, UpdateCertDto } from './dto/cert.dto';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {}

  findAll() {
    return this.repository
      .createQueryBuilder('certificate')
      .select()
      .orderBy('certificate.createAt', 'DESC')
      .getManyAndCount();
  }

  insertOne(addDto: AddCertDto) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Certificate)
      .values(addDto)
      .execute();
  }

  updateOne(updateDto: UpdateCertDto) {
    return this.repository
      .createQueryBuilder()
      .update(Certificate)
      .set(updateDto)
      .execute();
  }

  findOne(domain: string) {
    return this.repository
      .createQueryBuilder()
      .select()
      .where('domain = :domain', { domain })
      .getOne();
  }
}

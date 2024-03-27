import { DataSource } from 'typeorm';
import { Metadata } from './entity/metadata.entity';

export const metadataProviders = [
  {
    provide: 'METADATA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Metadata),
    inject: ['DATA_SOURCE'],
  },
];

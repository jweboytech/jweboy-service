import { DataSource } from 'typeorm';

console.log(process.env.DATABASE_HOST);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'biubiubiu',
        password: 'Jl940630.',
        database: 'blog',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        // logging: true,
      });

      return dataSource.initialize();
    },
  },
];

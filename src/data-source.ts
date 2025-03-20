import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'postgres',
  // password: 'postgres',
  // database: 'jweboy',
  url: 'xx',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
});

// 仅当 CLI 运行时才初始化
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) =>
    console.error('Error during Data Source initialization', err),
  );

module.exports = AppDataSource;

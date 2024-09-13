import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './service/project/project.module';
import { CategorytModule } from './service/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mariadb',
          host: configService.get<string>('DATABASE_HOST'),
          port: parseInt(configService.get<string>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
          extra: {
            max: 10, // 连接池中的最大连接数
            min: 2, // 连接池中的最小连接数
            idleTimeoutMillis: 30000, // 如果一个线程 30 秒钟内没有被使用过的话，那么就释放线程
          },
        };
      },
      inject: [ConfigService],
    }),
    ProjectModule,
    CategorytModule,
    // PhotoModule,
    // MetadataModule,
    // PlatformModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

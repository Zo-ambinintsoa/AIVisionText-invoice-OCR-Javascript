import { Module } from '@nestjs/common';
import { AppController } from './shared/app.controller';
import { AppService } from './shared/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './module/users/users.module';
import configuration from '../config/config';
import { User } from './module/users/entities/user.entity';
import { UserRole } from './module/users/entities/user-role.entity';
import { DocumentModelModule } from './module/document-model/document-model.module';
import { DocumentModel } from './module/document-model/entities/document-model.entity';
import { ExtractedDataModule } from './module/extracted-data/extracted-data.module';
import { ExtractedDatum } from './module/extracted-data/entities/extracted-datum.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, UserRole, DocumentModel, ExtractedDatum],
      synchronize: true,
    }),
    UsersModule,
    DocumentModelModule,
    ExtractedDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

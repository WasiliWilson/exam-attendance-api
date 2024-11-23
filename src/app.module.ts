import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
      type: 'postgres',
      host: ConfigService.get<string>('DATABASE_HOST'),
      port: ConfigService.get<number>('DATABASE_PORT'),
      username: ConfigService.get<string>('DATABASE_USERNAME'),
      password: ConfigService.get<string>('DATABASE_PASSWORD'),
      database: ConfigService.get<string>('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    inject: [ConfigService]
  }),
    AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

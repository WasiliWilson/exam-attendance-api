import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env',
  })
    ,JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService: ConfigService)=>({
      global: true,
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: '86000s' },}),
      inject:[ConfigService]
    }),
  UserModule,
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

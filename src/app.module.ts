import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/shared/database/pm-db';
import { GlobalJwtModule } from 'src/shared/jwt/global-jwt.module';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GlobalJwtModule,

    TypeOrmModule.forRootAsync({
      // name: 'PM_DB',
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

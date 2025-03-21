import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/public/users.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}

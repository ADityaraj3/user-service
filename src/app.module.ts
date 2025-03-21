import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './modules/auth/auth.service';
import { UserModel } from './models/public/users.model';
import { PermissionModel } from './models/master/permissions.model';
import { RoleModel } from './models/system-config/role.mode';
import { RolePermissionMappingModel } from './models/system-config/role-permission-mapping.model';
import { UniversityModel } from './models/system-config/universities.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.db_host,
      port: Number(process.env.db_port),
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.db_name,
      dialectOptions: {},
      // models: [__dirname + '/models/**/*{model.ts,model.js}'],
      // models: [__dirname + '/models/master/*{model.ts,model.js}'],
      models: [
        UserModel,
        PermissionModel,
        RoleModel,
        RolePermissionMappingModel,
        UniversityModel,
      ],
      synchronize: false,
      autoLoadModels: true,
      define: {
        freezeTableName: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
      logging: false,
      pool: {
        max: 30,
        min: 3,
        idle: 60000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, AuthService],
})
export class AppModule {}

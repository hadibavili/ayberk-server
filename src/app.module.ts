import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { OperatorModule } from './operator/operator.module';
import { SettingModule } from './setting/setting.module';
import { EnvironmentModule } from './environment/environment.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get(
          'database.user',
        )}:${configService.get('database.password')}@${configService.get(
          'database.host',
        )}:${configService.get(
          'database.port',
        )}/ayberk?authSource=admin&readPreference=primary&directConnection=true&ssl=false`,
      }),
      inject: [ConfigService],
    }),
    OperatorModule,
    SettingModule,
    EnvironmentModule,
    ProjectModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

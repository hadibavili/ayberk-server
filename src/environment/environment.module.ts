import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from 'src/project/project.module';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';
import { Environment, EnvironmentSchema } from './models/environment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Environment.name,
        schema: EnvironmentSchema,
      },
    ]),
    forwardRef(() => ProjectModule),
  ],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}

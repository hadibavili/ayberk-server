import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsAuthorized } from 'src/auth/decorators/isAuthorized.decorator';
import { MongoIdPipe } from 'src/lib/validators/pipes/mongoId.pipe';
import { Action, PrivilegeDomain } from 'src/operator/models/privilege.model';
import { CreateProjectDto } from './dtos/createProject.dto';
import { PatchProjectDto } from './dtos/patchProject.dto';
import { Project, ProjectDocument } from './models/project.model';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @IsAuthorized({
    domain: PrivilegeDomain.PROJECTS,
    action: Action.CREATE,
  })
  async createProject(@Body() dto: CreateProjectDto): Promise<ProjectDocument> {
    return await this.projectService.createProject(dto);
  }

  @Get()
  @IsAuthorized({
    domain: PrivilegeDomain.PROJECTS,
    action: Action.READ,
  })
  async getProjects(): Promise<ProjectDocument[] | Project> {
    return await this.projectService.getProjects();
  }

  @Get('/:id')
  @IsAuthorized({
    domain: PrivilegeDomain.PROJECTS,
    action: Action.READ,
  })
  async getProject(
    @Param('id', MongoIdPipe) id: string,
  ): Promise<ProjectDocument[] | Project> {
    return await this.projectService.getProjects(id);
  }

  @Patch('/:id')
  @IsAuthorized({
    domain: PrivilegeDomain.PROJECTS,
    action: Action.UPDATE,
  })
  async patchProject(
    @Param('id', MongoIdPipe) id: string,
    @Body() dto: PatchProjectDto,
  ): Promise<ProjectDocument> {
    return await this.projectService.patchProject(id, dto);
  }

  @Delete('/:id')
  @IsAuthorized({
    domain: PrivilegeDomain.PROJECTS,
    action: Action.DELETE,
  })
  async deleteProject(
    @Param(':id', MongoIdPipe) id: string,
  ): Promise<ProjectDocument> {
    return await this.projectService.deleteProject(id);
  }
}

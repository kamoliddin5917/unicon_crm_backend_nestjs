import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { multerOption } from 'src/utils/fileUpload';
import { ProjectDTO } from './dtos/project.dto';
import { IProject } from './interfaces/project.interface';
import { ProjectService } from './project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('media', null, multerOption))
  async create(
    @Body() project: ProjectDTO,
    @UserId() id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IProject> {
    try {
      const medias = files.map((file) => file.filename);

      const createProject = await this.projectService.create(
        project,
        id,
        medias,
      );
      return createProject;
    } catch (error) {
      console.log(error);

      if (error.status && (error.status === 500 || error.status === 400)) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

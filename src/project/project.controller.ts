import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/utils/fileUpload';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('media', null, multerOption))
  async create(
    @Req() req: any,
    @Res() res: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const medias = files.map((file) => file.filename);

      const createProject = await this.projectService.create(
        req['body'],
        req['headers'],
        medias,
      );
      return res.status(201).json(createProject);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}

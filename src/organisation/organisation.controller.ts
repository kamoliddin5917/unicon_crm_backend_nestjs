import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/utils/fileUpload';
// import { OrganisationDTO } from './dtos/organisation.dto';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOption))
  async create(
    @Req() req,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const createORG = await this.organisationService.create(
        req['body'],
        req['headers'],
        file.filename,
      );
      return res.status(201).json(createORG);
    } catch (error) {
      console.log(error);
      return res.status(error.status).json(error);
    }
  }
}

import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user.decorator';
import { multerOption } from 'src/utils/fileUpload';
import { OrganisationDTO } from './dtos/organisation.dto';
import { IOrganisation } from './interfaces/organisation.dto';
import { OrganisationService } from './organisation.service';

@ApiTags('organisation')
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOption))
  async create(
    @Body() organisation: OrganisationDTO,
    @UserId() id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IOrganisation> {
    try {
      const createORG = await this.organisationService.create(
        organisation,
        id,
        file.filename,
      );
      return createORG;
    } catch (error) {
      console.log(error);

      if (error.status && (error.status === 500 || error.status === 400)) {
        throw new HttpException(error.message, error.status);
      }

      throw new HttpException('SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

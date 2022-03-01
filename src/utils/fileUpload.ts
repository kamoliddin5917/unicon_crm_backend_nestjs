import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = { dest: 'public' };

export const multerOption = {
  fileFilter: (req: any, file: any, cb: any) => {
    if (
      file.mimetype.split('/')[0] === 'image' ||
      file.mimetype.split('/')[0] === 'video'
    ) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any): void => {
      cb(
        null,
        `${file.mimetype.split('/')[0]}__${uuidv4()}.${
          file.mimetype.split('/')[1]
        }`,
      );
    },
  }),
};

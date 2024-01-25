import { ExamsService } from './exams.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { examsDto } from './dto/exams.dto';
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post('/addExam')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async addExam(
    @Body() req: examsDto,
    @UploadedFiles() image,
    @Res() res: Response,
  ) {
    try {
      const result = await this.examsService.addExam(req, image);
      console.log('result', result);

      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error.message,
      });
    }
  }

  @Post('/editExam')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateExam(
    @Body() req: examsDto,
    @UploadedFiles() image,
    @Res() res: Response,
  ) {
    try {
      const result = await this.examsService.examUpdate(req, image);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
  @Post('/deleteExam')
  async deleteExam(@Body() req: examsDto) {
    try {
      const res = await this.examsService.deleteExam(req);
      return res;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}

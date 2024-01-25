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
import { CoursesService } from './courses.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { coursesDto } from './dto/courses.dto';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post('/addCourse')
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
  async addCourse(
    @Body() req: coursesDto,
    @UploadedFiles() image,
    @Res() res: Response,
  ) {
    try {
      const result = await this.coursesService.addCourse(req, image);
      console.log('result', result);

      return res.status(result.statusCode).send(result);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        msg: error.message,
      });
    }
  }

  @Post('/updateCourse')
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
  async updateCourse(
    @Body() req: coursesDto,
    @UploadedFiles() image,
    @Res() res: Response,
  ) {
    try {
      const result = await this.coursesService.courseUpdate(req, image);
      return res.status(result.statusCode).send(result);
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
  @Post('/deleteCourse')
  async deleteCourse(@Body() req: coursesDto) {
    try {
      const res = await this.coursesService.deleteCourse(req);
      return res;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}

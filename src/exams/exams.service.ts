import { HttpStatus, Injectable } from '@nestjs/common';
import { exams } from './schema/exams.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { examsDto } from './dto/exams.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(exams.name) private readonly examsModel: Model<exams>,
  ) {}
  async addExam(req: examsDto, image) {
    try {
      const findStore = await this.examsModel.findOne({
        examName: req.examName,
      });
      if (!findStore) {
        if (image) {
          const reqDoc = image.map((doc, index) => {
            let IsPrimary = false;
            if (index == 0) {
              IsPrimary = true;
            }
            const randomNumber = Math.floor(Math.random() * 1000000 + 1);
            return doc.filename;
          });

          req.image = reqDoc.toString();
        }

        const addExam = await this.examsModel.create(req);
        return {
          statusCode: HttpStatus.OK,
          message: 'Created Successfully',
          data: addExam,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Already existed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async examUpdate(req: examsDto, image) {
    try {
      const findStore = await this.examsModel.findOne({
        examId: req.examId,
      });
      console.log(req, 'req...', image);
      if (image) {
        const reqDoc = image.map((doc, index) => {
          let IsPrimary = false;
          if (index == 0) {
            IsPrimary = true;
          }
          const randomNumber = Math.floor(Math.random() * 1000000 + 1);
          return doc.filename;
        });

        req.image = reqDoc.toString();
      }
      if (req.image) {
        const updateExamResp = await this.examsModel.updateOne(
          { examId: req.examId },
          {
            $set: {
              examName: req.examName,
              image: req.image,
            },
          },
        );
        console.log(updateExamResp);

        if (updateExamResp) {
          return {
            statusCode: HttpStatus.OK,
            message: 'updated successfully',
            data: updateExamResp,
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          };
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async deleteExam(req: examsDto) {
    try {
      const findExam = await this.examsModel.findOne({
        examId: req.examId,
      });
      if (findExam) {
        const res = await this.examsModel.deleteOne({
          examId: req.examId,
        });
        if (res) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Deleted Successfully',
            data: res,
            deletedExam: findExam,
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          };
        }
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'ExamId Not Found',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}

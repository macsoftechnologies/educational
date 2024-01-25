import { HttpStatus, Injectable } from '@nestjs/common';
import { coursesDto } from './dto/courses.dto';
import { courses } from './schema/courses.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(courses.name) private readonly coursesModel: Model<courses>,
  ) {}
  async addCourse(req: coursesDto, image) {
    try {
      const findStore = await this.coursesModel.findOne({
        courseName: req.courseName,
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

        const addCourse = await this.coursesModel.create(req);
        return {
          statusCode: HttpStatus.OK,
          message: 'Created Successfully',
          data: addCourse,
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

  async courseUpdate(req: coursesDto, image) {
    try {
      const findStore = await this.coursesModel.findOne({
        courseId: req.courseId,
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
        const updateCourseResp = await this.coursesModel.updateOne(
          { courseId: req.courseId },
          {
            $set: {
              courseName: req.courseName,
              image: req.image,
            },
          },
        );
        console.log(updateCourseResp);

        if (updateCourseResp) {
          return {
            statusCode: HttpStatus.OK,
            message: 'updated successfully',
            data: updateCourseResp,
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

  async deleteCourse(req: coursesDto) {
    try {
      const findCourse = await this.coursesModel.findOne({
        courseId: req.courseId,
      });
      if (findCourse) {
        const res = await this.coursesModel.deleteOne({
          courseId: req.courseId,
        });
        if (res) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Deleted Successfully',
            data: res,
            deletedCourse: findCourse,
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
          message: 'Exam Not Found',
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

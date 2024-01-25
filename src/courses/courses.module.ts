import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courses, coursesSchema } from './schema/courses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: courses.name, schema: coursesSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

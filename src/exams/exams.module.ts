import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { exams, examsSchema } from './schema/exams.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: exams.name, schema: examsSchema }]),
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class exams extends Document {
  @Prop({ required: true, unique: true, default: uuid })
  examId: string;
  @Prop()
  examName: string;
  @Prop()
  image: string;
}

export const examsSchema = SchemaFactory.createForClass(exams);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class courses extends Document {
  @Prop({ required: true, unique: true, default: uuid })
  courseId: string;
  @Prop()
  courseName: string;
  @Prop()
  image: string;
}

export const coursesSchema = SchemaFactory.createForClass(courses);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class user extends Document {
  @Prop({ required: true, unique: true, default: uuid })
  userId: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  mobileNum: string;
  @Prop()
  emailId: string;
  @Prop()
  token: string;
}
export const userSchema = SchemaFactory.createForClass(user);

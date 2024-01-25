import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://macsof:macsof@nextlevelcarwash.yjs3i.mongodb.net/educational?retryWrites=true&w=majority',
    ),
    UserModule,
    CoursesModule,
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user, userSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, adminSchema } from './schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: user.name, schema: userSchema },
      { name: Admin.name, schema: adminSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

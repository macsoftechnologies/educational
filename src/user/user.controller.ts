import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { UserService } from './user.service';
import { adminDto } from './dto/admin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/addAdmin')
  async addAdmin(@Body() req: adminDto) {
    try {
      const addAdmin = await this.userService.addAdmin(req);
      return addAdmin;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @Post('/loginUser')
  async loginUser(@Body() req: userDto) {
    try {
      const findAdmin = await this.userService.loginUser(req);
      return findAdmin;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @Post('/adduser')
  async adduser(@Body() req: userDto) {
    try {
      const addUser = await this.userService.createUser(req);
      return addUser;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  @Post('/loginuser')
  async loginuser(@Body() req: userDto) {
    try {
      const findUser = await this.userService.loginUser(req);
      return findUser;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}

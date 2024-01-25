import { HttpStatus, Injectable } from '@nestjs/common';
import { user } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/admin.schema';
import { userDto } from './dto/user.dto';
import { adminDto } from './dto/admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(user.name) private readonly userModel: Model<user>,
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}
  async createUser(req: userDto) {
    try {
      const findUser = await this.userModel.findOne({
        emailId: req.emailId,
      });
      if (!findUser) {
        const addUser = await this.userModel.create(req);
        return {
          statusCode: HttpStatus.OK,
          message: 'User added successfully',
          data: addUser,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already existed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
  async addAdmin(req: adminDto) {
    try {
      const findUser = await this.adminModel.findOne({
        email: req.email,
      });
      if (!findUser) {
        const addUser = await this.adminModel.create(req);
        return {
          statusCode: HttpStatus.OK,
          message: 'User added successfully',
          data: addUser,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User already existed',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
  async loginAdmin(req: adminDto) {
    try {
      const findAdmin = await this.adminModel.findOne({
        $or: [{ mobileNumber: req.mobileNumber }, { email: req.email }],
      });
      //   console.log(findUser);
      if (!findAdmin) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Admin Not Found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Admin Login successfull',
          data: findAdmin,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
  async loginUser(req: userDto) {
    try {
      const findAdmin = await this.userModel.findOne({
        $or: [{ mobileNumber: req.mobileNum }, { emailId: req.emailId }],
      });
      //   console.log(findUser);
      if (!findAdmin) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Admin Not Found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'Admin Login successfull',
          data: findAdmin,
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

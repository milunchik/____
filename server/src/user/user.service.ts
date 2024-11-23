import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './user.schema';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { hashPassword } from '../middleware/password-hash.middleware';
import { PaginationDTO } from '../user/dtos/pagination.dto';
import { paginationFunc } from '../middleware/pagination.middleware';
import { Role } from 'src/utils/user-roles.constants';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserType>) {}

  async create(email: string, password: string, role: string) {
    return await this.userModel.create({ email, password, role });
  }

  async findOne(id: string) {
    if (!id) {
      throw new NotFoundException('Unauthorized user');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changePassword(token: string, password: string) {
    const { _id: userId } = await this.userModel.findOne({ resetToken: token });

    if (!userId) {
      throw new NotFoundException('invalid token');
    }
    const hashedPassword = await hashPassword(password);

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { password: hashedPassword } },
    );
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new NotFoundException('Invalid email');
    }
    return await this.userModel.findOne({ email });
  }

  async findByToken(token: string) {
    return await this.userModel.findOne({ resetToken: token });
  }

  async findByName(name: string) {
    if (!name) {
      throw new NotFoundException('Unauthorized user');
    }
    return await this.userModel.findOne({ fullname: name });
  }

  async findAllUsers(pagination: PaginationDTO) {
    const { skip, limit } = pagination;
    const { pageSize, pageSkip } = paginationFunc(limit, skip);
    const users = await this.userModel.find().skip(pageSkip).limit(pageSize);

    return users;
  }

  async findAllTeachers(pagination: PaginationDTO) {
    const { skip, limit } = pagination;
    const { pageSize, pageSkip } = paginationFunc(limit, skip);

    const teachers = await this.userModel
      .find({ role: Role.TEACHER })
      .skip(pageSkip)
      .limit(pageSize);

    return teachers;
  }

  async updateProfile(userId: string, body: UpdateProfileDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const {
      email,
      password,
      fullname,
      phone_number,
      experience,
      lessons,
      description,
      image,
    } = body;

    let hashedPassword;
    if (password) {
      hashedPassword = hashPassword(password);
    }

    const updatedUser = {
      email: email || user.email,
      password: hashedPassword || user.password,
      fullname: fullname || user.fullname,
      phone_number: phone_number || user.phone_number,
      experience: experience || user.experience,
      lessons: lessons || user.lessons,
      description: description || user.description,
      image: image || user.image,
    };
    return await this.userModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
  }

  async delete(id: string) {
    if (!id) {
      throw new BadRequestException('User ID must be provided');
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
  }
}

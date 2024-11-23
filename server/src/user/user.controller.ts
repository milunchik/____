import {
  Body,
  Controller,
  Param,
  Res,
  Post,
  Put,
  Session,
  Delete,
  Get,
  UseGuards,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import * as mongoose from 'mongoose';
import { Role } from '../utils/user-roles.constants';
import { PaginationDTO } from '../user/dtos/pagination.dto';
import { resetPasswordDTO } from './dtos/reset-password.dto';
import { MyFileInterceptor } from '../interceptors/file-upload.interceptor';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signupuser')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = Role.USER;
    session.userId = await this.authService.signup(
      body.email,
      body.password,
      role,
    );
    return session;
  }

  @Post('/signupteacher')
  async createTeacher(@Body() body: CreateUserDTO, @Session() session: any) {
    const role = Role.TEACHER;
    session.userId = await this.authService.signup(
      body.email,
      body.password,
      role,
    );
    return session;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user._id;
    session.userRole = user.role;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getProfile(@Session() session: any) {
    const { userId } = session;
    const user = await this.authService.getUser(userId);
    return { userId: user._id, userRole: user.role, ...user };
  }

  @UseGuards(AdminGuard)
  @Get('/users')
  async findAllUser(@Query() pagination: PaginationDTO) {
    try {
      return await this.userService.findAllUsers(pagination);
    } catch (error) {
      throw new NotFoundException('Could not fetch users');
    }
  }

  @Get('/teachers')
  async allTeachers(@Query() pagination: PaginationDTO) {
    return await this.userService.findAllTeachers(pagination);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user ID');
    }
    return await this.userService.findOne(id);
  }

  @Get('/:id/image')
  async getUserImage(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);
    if (user && user.image) {
      const filePath = `assets/userImage/${user.image.replace(/^.*[\\\/]/, '')}`;
      return res.sendFile(filePath, { root: '.' });
    } else {
      return res.status(404).send('Image not found');
    }
  }

  @Put('/:id')
  @UseInterceptors(MyFileInterceptor)
  async updateProfile(
    @Param('id') id: string,
    @Body() body: UpdateProfileDto,
    @UploadedFile() image,
  ) {
    if (image) {
      body.image = image.path;
    }
    return await this.userService.updateProfile(id, body);
  }

  @Post('/reset')
  async resetPassword(@Body() body: resetPasswordDTO) {
    const resetPasswordData: resetPasswordDTO = { email: body.email };
    return await this.authService.resetPassword(resetPasswordData);
  }

  @Patch('/reset/:resetToken')
  async changePassword(
    @Body() body: resetPasswordDTO,
    @Param('resetToken') resetToken: string,
  ) {
    const { password } = body;
    return await this.authService.changePassword(resetToken, password);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    session.userRole = null;
  }
}

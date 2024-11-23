import mongoose, { model, Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullname: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  experience: { type: String, default: '' },
  lessons: { type: String, default: '' },
  image: { type: String, default: null },
  description: { type: String, default: '' },
  price: { type: Number, default: 0 },
  role: { type: String, ref: 'Role' },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
});

export type UserType = {
  email: { type: string };
  password: string;
  fullname: { type: string };
  phone_number: { type: string };
  experience: { type: string };
  lessons: { type: string };
  image: string;
  description: { type: string };
  role: { type: string };
  resetToken: string;
  resetTokenExpiration: Date;
};

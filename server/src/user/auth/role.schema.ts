import { Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

Schema();
export const RoleSchema = new mongoose.Schema({
  value: { type: String, default: 'user' },
});

export type RoleType = {
  value: { type: string };
};

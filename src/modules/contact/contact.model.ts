import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactSchema.index({ name: 1 });
ContactSchema.index({ email: 1 });
ContactSchema.index({ isDeleted: 1, createdAt: -1 });
ContactSchema.index({ isRead: 1 });

export default mongoose.model<IContact>('Contact', ContactSchema);

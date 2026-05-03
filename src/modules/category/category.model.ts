import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name:      string;
  slug:      string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);
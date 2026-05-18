import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  location: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  images: string[];
  status: 'available' | 'sold' | 'rented';
  featured: boolean;
  isNewProject: boolean;
  createdAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  location:    { type: Schema.Types.ObjectId, ref: 'Location', required: false },
  category:    { type: Schema.Types.ObjectId, ref: 'Category', required: false },
  images:      [{ type: String }],
  status:      { type: String, enum: ['available','sold','rented'], default: 'available' },
  featured:    { type: Boolean, default: false },
  isNewProject:{ type: Boolean, default: false },
}, { timestamps: true });

PropertySchema.index({ slug: 1 });
PropertySchema.index({ featured: 1, status: 1 });
PropertySchema.index({ category: 1, location: 1 });

export default mongoose.model<IProperty>('Property', PropertySchema);
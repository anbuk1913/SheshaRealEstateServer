import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  location: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  images: string[];
  amenities: string[];
  status: 'available' | 'sold' | 'rented';
  featured: boolean;
  isNewProject: boolean;
  bedrooms: number;
  bathrooms: number;
  area: number; // sq ft
  createdAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  location:    { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  category:    { type: Schema.Types.ObjectId, ref: 'PropertyCategory', required: true },
  images:      [{ type: String }],
  amenities:   [{ type: String }],
  status:      { type: String, enum: ['available','sold','rented'], default: 'available' },
  featured:    { type: Boolean, default: false },
  isNewProject:{ type: Boolean, default: false },
  bedrooms:    { type: Number, default: 0 },
  bathrooms:   { type: Number, default: 0 },
  area:        { type: Number, default: 0 },
}, { timestamps: true });

// PropertySchema.index({ slug: 1 });
PropertySchema.index({ featured: 1, status: 1 });
PropertySchema.index({ category: 1, location: 1 });

export default mongoose.model<IProperty>('Property', PropertySchema);
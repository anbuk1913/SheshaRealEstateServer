import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  city:    string;
  area:    string;
  state:   string;
  country: string;
  slug:    string;
}

const LocationSchema = new Schema<ILocation>({
  city:    { type: String, required: true },
  area:    { type: String },
  state:   String,
  country: { type: String, default: 'India' },
  slug:    { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<ILocation>('Location', LocationSchema);
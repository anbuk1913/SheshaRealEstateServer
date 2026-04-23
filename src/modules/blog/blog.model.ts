import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title:      string;
  slug:       string;
  content:    string;
  excerpt:    string;
  coverImage: string;
  author:     string;
  tags:       string[];
  published:  boolean;
  createdAt:  Date;
}

const BlogSchema = new Schema<IBlog>({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  content:     { type: String, required: true },
  excerpt:     { type: String },
  coverImage:  { type: String },
  author:      { type: String, default: 'Admin' },
  tags:        [String],
  published:   { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
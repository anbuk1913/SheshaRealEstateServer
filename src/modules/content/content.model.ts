import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  key:      string;
  page:     string;
  title:    string;
  subtitle: string;
  body:     string;
  cta:      string;
  image:    string;
  extra:    any;
}

// One doc per page section, e.g. key = "hero", "about_mission", "footer_links"
const PagesContentSchema = new Schema<IContent>({
  key:     { type: String, required: true, unique: true },
  page:    { type: String, required: true },
  title:   String,
  subtitle: String,
  body:    String,
  cta:     String,
  image:   String,
  extra:   Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model<IContent>('PageContent', PagesContentSchema);
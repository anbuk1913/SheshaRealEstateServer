import Blog, { IBlog } from './blog.model';

export class BlogRepository {
  async findAll(onlyPublished = true) {
    const filter = onlyPublished ? { published: true } : {};
    return Blog.find(filter).sort({ createdAt: -1 });
  }

  async findBySlug(slug: string) {
    return Blog.findOne({ slug });
  }

  async findById(id: string) {
    return Blog.findById(id);
  }

  async create(payload: Partial<IBlog>) {
    return Blog.create(payload);
  }

  async update(id: string, payload: Partial<IBlog>) {
    return Blog.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  async delete(id: string) {
    return Blog.findByIdAndDelete(id);
  }
}

export const blogRepository = new BlogRepository();

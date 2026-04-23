import slugify from 'slugify';
import { blogRepository } from './blog.repository';
import { IBlog } from './blog.model';

export class BlogService {
  async getAll(admin = false) {
    return blogRepository.findAll(!admin);
  }

  async getBySlug(slug: string) {
    const blog = await blogRepository.findBySlug(slug);
    if (!blog) throw Object.assign(new Error('Blog not found'), { status: 404 });
    return blog;
  }

  async create(payload: Partial<IBlog>) {
    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true });
    }
    return blogRepository.create(payload);
  }

  async update(id: string, payload: Partial<IBlog>) {
    const updated = await blogRepository.update(id, payload);
    if (!updated) throw Object.assign(new Error('Blog not found'), { status: 404 });
    return updated;
  }

  async delete(id: string) {
    const deleted = await blogRepository.delete(id);
    if (!deleted) throw Object.assign(new Error('Blog not found'), { status: 404 });
    return deleted;
  }
}

export const blogService = new BlogService();

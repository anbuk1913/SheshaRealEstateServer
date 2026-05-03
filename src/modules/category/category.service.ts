import slugify from 'slugify';
import { categoryRepository } from './category.repository';
import { ICategory } from './category.model';

export class CategoryService {
  getAll() { return categoryRepository.findAll(); }

  async getById(id: string) {
    const cat = await categoryRepository.findById(id);
    if (!cat) throw Object.assign(new Error('Category not found'), { status: 404 });
    return cat;
  }

  async create(payload: Partial<ICategory>) {
    if (!payload.slug && payload.name) {
      payload.slug = slugify(payload.name, { lower: true, strict: true });
    }
    return categoryRepository.create(payload);
  }

  async update(id: string, payload: Partial<ICategory>) {
    const updated = await categoryRepository.update(id, payload);
    if (!updated) throw Object.assign(new Error('Category not found'), { status: 404 });
    return updated;
  }

  async delete(id: string) {
    const deleted = await categoryRepository.delete(id);
    if (!deleted) throw Object.assign(new Error('Category not found'), { status: 404 });
    return deleted;
  }
}

export const categoryService = new CategoryService();
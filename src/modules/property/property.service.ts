import slugify from 'slugify';
import { propertyRepository } from './property.repository';
import { IProperty } from './property.model';

export class PropertyService {
  async getAll(query: any) {
    const { page = 1, limit = 12, category, location, status, featured, search } = query;
    const filter: any = {};
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (status)   filter.status   = status;
    if (featured) filter.featured = featured === 'true';
    if (search)   filter.title    = { $regex: search, $options: 'i' };
    return propertyRepository.findAll(filter, Number(page), Number(limit));
  }

  async getBySlug(slug: string) {
    const property = await propertyRepository.findBySlug(slug);
    if (!property) throw new Error('Property not found');
    return property;
  }

  // ← new
  async getById(id: string) {
    return propertyRepository.findById(id);
  }

  async getFeatured() {
    return propertyRepository.findFeatured();
  }

  async create(payload: Partial<IProperty>) {
    // if (!payload.slug && payload.title) {
    //   payload.slug = slugify(payload.title, { lower: true, strict: true });
    // }
    return propertyRepository.create(payload);
  }

  async update(id: string, payload: Partial<IProperty>) {
    const updated = await propertyRepository.update(id, payload);
    if (!updated) throw new Error('Property not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await propertyRepository.delete(id);
    if (!deleted) throw new Error('Property not found');
    return deleted;
  }

  async getDashboardStats() {
    const [statusCounts, total] = await Promise.all([
      propertyRepository.countByStatus(),
      propertyRepository.findAll({}, 1, 1),
    ]);
    return { statusCounts, total: total.total };
  }
}

export const propertyService = new PropertyService();
import slugify from 'slugify';
import { propertyRepository } from './property.repository';
import { IProperty } from './property.model';
import Location from '../location/location.model';

export class PropertyService {
  async getAll(query: any) {
    const { page = 1, limit = 12, category, location, status, featured, search } = query;

    const filter: any = {};

    if (category) filter.category = category;
    if (location) filter.location = location;
    if (status)   filter.status   = status;
    if (featured) filter.featured = featured === 'true';

    if (search) {
      const matchingLocations = await Location.find({
        $or: [
          { city: { $regex: search, $options: 'i' } },
          { area: { $regex: search, $options: 'i' } },
          { state: { $regex: search, $options: 'i' } },
        ],
      }).select('_id');

      const locationIds = matchingLocations.map((l) => l._id);

      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        ...(locationIds.length > 0
          ? [{ location: { $in: locationIds } }]
          : []),
      ];
    }

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
    if (!payload.slug && payload.title) {
      payload.slug = slugify(payload.title, { lower: true, strict: true });
    }
    return propertyRepository.create(payload);
  }

  async update(id: string, payload: Partial<IProperty>) {
    if (payload.title && payload.slug !== slugify(payload.title, { lower: true, strict: true })) {
      payload.slug = slugify(payload.title, { lower: true, strict: true });
    }
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
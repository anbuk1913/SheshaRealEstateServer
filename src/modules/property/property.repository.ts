import Property, { IProperty } from './property.model';
import { FilterQuery } from 'mongoose';

export class PropertyRepository {
  async findAll(filter: FilterQuery<IProperty>, page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Property.find(filter)
        .populate('location', 'city area')
        .populate('category', 'name')
        .sort({ createdAt: -1 })
        .skip(skip).limit(limit),
      Property.countDocuments(filter),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    return Property.findOne({ slug })
      .populate('location').populate('category');
  }

  async findFeatured() {
    return Property.find({ featured: true, status: 'available' })
      .populate('location', 'city area').limit(6);
  }

  async create(payload: Partial<IProperty>) {
    return Property.create(payload);
  }

  async update(id: string, payload: Partial<IProperty>) {
    return Property.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  }

  async delete(id: string) {
    return Property.findByIdAndDelete(id);
  }

  async countByStatus() {
    return Property.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
  }
}

export const propertyRepository = new PropertyRepository();
import slugify from 'slugify';
import { locationRepository } from './location.repository';
import { ILocation } from './location.model';

export class LocationService {
  getAll() { return locationRepository.findAll(); }

  async getById(id: string) {
    const loc = await locationRepository.findById(id);
    if (!loc) throw Object.assign(new Error('Location not found'), { status: 404 });
    return loc;
  }

  async create(payload: Partial<ILocation>) {
    if (!payload.slug) {
      const base = [payload.city, payload.area].filter(Boolean).join(' ');
      payload.slug = slugify(base, { lower: true, strict: true });
    }
    return locationRepository.create(payload);
  }

  async update(id: string, payload: Partial<ILocation>) {
    const updated = await locationRepository.update(id, payload);
    if (!updated) throw Object.assign(new Error('Location not found'), { status: 404 });
    return updated;
  }

  async delete(id: string) {
    const deleted = await locationRepository.delete(id);
    if (!deleted) throw Object.assign(new Error('Location not found'), { status: 404 });
    return deleted;
  }
}

export const locationService = new LocationService();
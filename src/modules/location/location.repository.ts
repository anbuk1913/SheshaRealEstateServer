import Location, { ILocation } from './location.model';

export class LocationRepository {
  findAll()               { return Location.find().sort({ city: 1, area: 1 }); }
  findById(id: string)    { return Location.findById(id); }
  findBySlug(slug: string){ return Location.findOne({ slug }); }
  create(p: Partial<ILocation>) { return Location.create(p); }
  update(id: string, p: Partial<ILocation>) {
    return Location.findByIdAndUpdate(id, p, { new: true, runValidators: true });
  }
  delete(id: string) { return Location.findByIdAndDelete(id); }
}

export const locationRepository = new LocationRepository();
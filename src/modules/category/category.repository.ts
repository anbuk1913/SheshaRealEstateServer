import Category, { ICategory } from './category.model';

export class CategoryRepository {
  findAll()               { return Category.find().sort({ name: 1 }); }
  findById(id: string)    { return Category.findById(id); }
  findBySlug(slug: string){ return Category.findOne({ slug }); }
  create(p: Partial<ICategory>) { return Category.create(p); }
  update(id: string, p: Partial<ICategory>) {
    return Category.findByIdAndUpdate(id, p, { new: true, runValidators: true });
  }
  delete(id: string) { return Category.findByIdAndDelete(id); }
}

export const categoryRepository = new CategoryRepository();
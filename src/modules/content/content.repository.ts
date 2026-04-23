import Content, { IContent } from './content.model';

export class ContentRepository {
  async findAll() {
    return Content.find().sort({ page: 1, key: 1 });
  }

  async findByKey(key: string) {
    return Content.findOne({ key });
  }

  async findByPage(page: string) {
    return Content.find({ page });
  }

  async upsert(key: string, payload: Partial<IContent>) {
    return Content.findOneAndUpdate(
      { key },
      { ...payload, key },
      { new: true, upsert: true, runValidators: true }
    );
  }

  async delete(id: string) {
    return Content.findByIdAndDelete(id);
  }
}

export const contentRepository = new ContentRepository();

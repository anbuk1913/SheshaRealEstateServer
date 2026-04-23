import { contentRepository } from './content.repository';
import { IContent } from './content.model';

export class ContentService {
  async getAll() {
    return contentRepository.findAll();
  }

  async getByPage(page: string) {
    return contentRepository.findByPage(page);
  }

  async getByKey(key: string) {
    const content = await contentRepository.findByKey(key);
    if (!content) throw Object.assign(new Error('Content not found'), { status: 404 });
    return content;
  }

  async upsert(key: string, payload: Partial<IContent>) {
    return contentRepository.upsert(key, payload);
  }

  async delete(id: string) {
    const deleted = await contentRepository.delete(id);
    if (!deleted) throw Object.assign(new Error('Content not found'), { status: 404 });
    return deleted;
  }
}

export const contentService = new ContentService();

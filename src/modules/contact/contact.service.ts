import { ContactRepository } from './contact.repository';
import { IContact } from './contact.model';

export class ContactService {
  private repo = new ContactRepository();

  async createContact(data: Partial<IContact>): Promise<IContact> {
    return await this.repo.create(data);
  }

  async getContacts(skip: number = 0, limit: number = 10, search: string = ''): Promise<{ data: IContact[]; total: number }> {
    return await this.repo.findAll(skip, limit, search);
  }

  async getContactById(id: string): Promise<IContact | null> {
    return await this.repo.findById(id);
  }

  async markAsRead(id: string): Promise<IContact | null> {
    return await this.repo.markAsRead(id);
  }

  async deleteContact(id: string): Promise<IContact | null> {
    return await this.repo.softDelete(id);
  }

  async permanentlyDeleteContact(id: string): Promise<boolean> {
    return await this.repo.hardDelete(id);
  }

  async getContactStats(): Promise<{ total: number; unread: number }> {
    return await this.repo.getStats();
  }
}

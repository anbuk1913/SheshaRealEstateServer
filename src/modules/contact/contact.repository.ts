import ContactModel, { IContact } from './contact.model';

export class ContactRepository {
  async create(data: Partial<IContact>): Promise<IContact> {
    return await ContactModel.create(data);
  }

  async findAll(skip: number = 0, limit: number = 10, search: string = ''): Promise<{ data: IContact[]; total: number }> {
    const query: any = { isDeleted: false };

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: regex },
        { email: regex },
      ];
    }

    const total = await ContactModel.countDocuments(query);
    const data = await ContactModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return { data, total };
  }

  async findById(id: string): Promise<IContact | null> {
    return await ContactModel.findById(id);
  }

  async markAsRead(id: string): Promise<IContact | null> {
    return await ContactModel.findByIdAndUpdate(id, { isRead: true }, { new: true });
  }

  async softDelete(id: string): Promise<IContact | null> {
    return await ContactModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  }

  async hardDelete(id: string): Promise<boolean> {
    const result = await ContactModel.findByIdAndDelete(id);
    return !!result;
  }

  async getStats(): Promise<{ total: number; unread: number }> {
    const total = await ContactModel.countDocuments({ isDeleted: false });
    const unread = await ContactModel.countDocuments({ isDeleted: false, isRead: false });
    return { total, unread };
  }
}

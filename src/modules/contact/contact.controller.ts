import { Request, Response } from 'express';
import { ContactService } from './contact.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/apiResponse';

const service = new ContactService();

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json(new ApiResponse(false, 'Name, email, and message are required'));
  }

  const contact = await service.createContact({ name, email, phone, message });
  return res.status(201).json(new ApiResponse(true, 'Message sent successfully', contact));
});

export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const result = await service.getContacts(skip, Number(limit), String(search));

  return res.status(200).json(
    new ApiResponse(true, 'Contacts retrieved successfully', result)
  );
});

export const getContactById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    return res.status(404).json(new ApiResponse(false, 'Contact not found'));
  }

  return res.status(200).json(new ApiResponse(true, 'Contact retrieved successfully', contact));
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await service.markAsRead(id);

  if (!contact) {
    return res.status(404).json(new ApiResponse(false, 'Contact not found'));
  }

  return res.status(200).json(new ApiResponse(true, 'Contact marked as read', contact));
});

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await service.deleteContact(id);

  if (!contact) {
    return res.status(404).json(new ApiResponse(false, 'Contact not found'));
  }

  return res.status(200).json(new ApiResponse(true, 'Contact deleted successfully'));
});

export const getContactStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await service.getContactStats();
  return res.status(200).json(new ApiResponse(true, 'Stats retrieved successfully', stats));
});

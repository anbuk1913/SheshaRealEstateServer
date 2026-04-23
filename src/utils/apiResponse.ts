export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
    public meta?: object
  ) {}
}

export const ok = <T>(data: T, message = 'Success', meta?: object) =>
  new ApiResponse(true, message, data, meta);

export const fail = (message: string) =>
  new ApiResponse(false, message);
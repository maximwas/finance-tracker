import dayjs from 'dayjs';

export class ApiResponse<T = unknown> {
  data: T | null;
  message: string;
  success: boolean;
  timestamp: string;
  requestId: string;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, {
      timestamp: dayjs().toISOString(),
      requestId: crypto.randomUUID(),
      ...partial,
    });
  }
}

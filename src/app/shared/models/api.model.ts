export interface ApiResponse<T> {
  message: string;
  errors?: string | null;
  data: T;
}

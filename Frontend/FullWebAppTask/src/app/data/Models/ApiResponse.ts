export interface ApiResponse<T> {
  data: T;
  errors: string[];
  success: boolean;
}

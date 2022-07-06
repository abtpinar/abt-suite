export interface ServerPaginationInfo {
  count?: number;
  current_page?: number;
  links?: {
    next?: string;
  };
  next?: string;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface ServerCustomPaginatedData<T> extends ServerPaginationInfo {
  data: T[]
}

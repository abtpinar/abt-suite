/**
 * Represents the metadata about current page captured from server response.
 */
export interface PaginationInfo {
  page?: number;
  itemsPerPage?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

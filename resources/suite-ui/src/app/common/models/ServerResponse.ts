import { ServerPaginationInfo } from "./ServerPaginationInfo";

export interface ServerResponse<T> {
  messages?: string[];
  response?: {
    data?: T[];
    meta?: {
      pagination?: ServerPaginationInfo;
    };
  };
  response_code?: number;
  status?: string;
}

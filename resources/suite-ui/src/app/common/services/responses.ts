/**
 * Base interface of all the API requests.
 */
export interface IApiResponse {
  status: string;
  data?: any;
  response?: any;
  messages: string[];
  response_code: number; // this is the actual status code
}

/**
 * Response given by the login requests.
 */
export interface ILoginResponse extends IApiResponse {
  response: {
    user: string;
    token: string;
  };
}

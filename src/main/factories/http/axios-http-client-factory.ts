import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const makeAxiosHttpClient = ():AxiosHttpClient => {
  // const url = 'http://localhost:5050/api/login';
  return new AxiosHttpClient();
}

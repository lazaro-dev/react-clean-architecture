
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { Authentication } from '@/domain/usecases';
import { makeApiURL } from '@/main/factories/http/api-url-factory';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiURL(), makeAxiosHttpClient());
}

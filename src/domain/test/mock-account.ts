import { AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '../models'

import faker from 'faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): AccountModel => ({
  accessToken: faker.random.uuid()
})
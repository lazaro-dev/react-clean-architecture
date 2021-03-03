import { AccountModel } from '@/domain/models/account-model'
export type AuthenticationParams = {
  email: string,
  password: string
}

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}

// export namespace Authentication {
//   export type Params = {
//     email: string
//     password: string
//   }

//   export type Model = AccountModel
// }

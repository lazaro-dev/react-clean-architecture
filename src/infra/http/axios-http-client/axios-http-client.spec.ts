import {AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
describe('AxiosHttpClient', () => {
  test('should call axios with correct URL adn verb', async() => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })  
})
// import { AxiosHttpClient } from '@/infra/http'
// import { mockAxios, mockHttpResponse } from '@/infra/test'
// import { mockHttpRequest } from '@/data/test'

// import axios from 'axios'

// jest.mock('axios')

// type SutTypes = {
//   sut: AxiosHttpClient
//   mockedAxios: jest.Mocked<typeof axios>
// }

// const makeSut = (): SutTypes => {
//   const sut = new AxiosHttpClient()
//   const mockedAxios = mockAxios()
//   return {
//     sut,
//     mockedAxios
//   }
// }

// describe('AxiosHttpClient', () => {
//   test('Should call axios with correct values', async () => {
//     const request = mockHttpRequest()
//     const { sut, mockedAxios } = makeSut()

//     await sut.request(request)

//     expect(mockedAxios.request).toHaveBeenCalledWith({
//       url: request.url,
//       data: request.body,
//       headers: request.headers,
//       method: request.method
//     })
//   })

//   test('Should return correct response', async () => {
//     const { sut, mockedAxios } = makeSut()

//     const httpResponse = await sut.request(mockHttpRequest())
//     const axiosResponse = await mockedAxios.request.mock.results[0].value

//     expect(httpResponse).toEqual({
//       statusCode: axiosResponse.status,
//       body: axiosResponse.data
//     })
//   })

//   test('Should return correct error', () => {
//     const { sut, mockedAxios } = makeSut()
//     mockedAxios.request.mockRejectedValueOnce({
//       response: mockHttpResponse()
//     })

//     const promise = sut.request(mockHttpRequest())

//     expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
//   })
// })
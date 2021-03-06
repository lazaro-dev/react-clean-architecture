import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import axios from 'axios';
import { mockPostRequest } from '@/data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async() => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', () => {        
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  test('should return the correct statusCode and body on failure', () => {        
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    })
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
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
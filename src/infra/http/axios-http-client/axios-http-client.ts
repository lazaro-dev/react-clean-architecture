// import { HttpRequest, HttpResponse, HttpClient, HttpPostParams } from '@/data/protocols/http'
import { HttpPostParams } from '@/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<void> {

    await axios.post(params.url, params.body);
    // let axiosResponse: AxiosResponse
    // try {
    //   axiosResponse = await axios.request({
    //     url: data.url,
    //     method: data.method,
    //     data: data.body,
    //     headers: data.headers
    //   })
    // } catch (error) {
    //   axiosResponse = error.response
    // }
    // return {
    //   statusCode: axiosResponse.status,
    //   body: axiosResponse.data
    // }
  }
}
// import { HttpRequest, HttpResponse, HttpClient, HttpPostParams } from '@/data/protocols/http'
import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {

    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
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
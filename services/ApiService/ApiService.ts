import axios from 'axios'

type HeadersType = Record<string, string>
type AxiosHeader = {
  headers: HeadersType
}

export default class ApiService {
  private readonly baseUrl: string

  private token?: string

  getHeader(headers: HeadersType = {}): AxiosHeader {
    const header: AxiosHeader = {
      headers,
    }

    if (!header.headers['Content-Type']) {
      header.headers['Content-Type'] = 'application/json'
    }

    if (this.token) {
      header.headers.Authorization = `Bearer ${this.token}`
    }

    return header
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader()
      const response = await axios.get<T>(url, header)
      return response.data
    } catch (err) {
      // console.log(err)
      throw new Error()
    }
  }

  public async post<T, U>(endpoint: string, data?: U): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader({})
      const response = await axios.post<T>(url, data, header)
      return response.data
    } catch (error) {
      // console.log(JSON.stringify(error))
      throw new Error()
    }
  }

  public async put<T, U>(
    endpoint: string,
    data?: U,
    headers: Record<string, string> = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    try {
      const header = this.getHeader(headers)
      const response = await axios.put<T>(url, data, header)
      return response.data
    } catch (err) {
      // console.log(err)
      throw new Error()
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const header = this.getHeader()
      const response = await axios.delete<T>(url, header)
      return response.data
    } catch (err) {
      // console.log(err)
      throw new Error()
    }
  }

  public setToken(token: string) {
    this.token = token
  }

  public getToken() {
    return this.token
  }

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl
    if (this.token) {
      this.token = token
    }
  }
}

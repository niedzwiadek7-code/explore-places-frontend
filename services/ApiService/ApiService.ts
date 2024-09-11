type HeadersType = Record<string, string>

export type StandardResponse<T> = {
  statusCode: number
  result: 'SUCCESS' | 'VALIDATION ERROR' | 'AUTH ERROR' | 'ERROR'
  data: T | null
  headers: HeadersType
}

const handleResponse = async <T>(response: Response): Promise<StandardResponse<T>> => {
  const headers: HeadersType = {}
  response.headers.forEach((value: string, key: string) => {
    headers[key] = value
  })

  if (response.ok) {
    return {
      statusCode: response.status,
      result: 'SUCCESS',
      data: null,
      headers,
    }
  }

  let result: 'VALIDATION ERROR' | 'AUTH ERROR' | 'ERROR' = 'ERROR'

  if (response.status === 401) {
    result = 'AUTH ERROR'
  } else if (response.status >= 400 && response.status < 500) {
    result = 'VALIDATION ERROR'
  }

  const text = await response.text()

  return {
    statusCode: response.status,
    result,
    data: text ? JSON.parse(text) : null,
    headers,
  }
}

export default class ApiService {
  private readonly baseUrl: string

  private token?: string

  private _sessionId?: string

  getHeader(headers: HeadersType = {}): HeadersType {
    const defaultHeaders: HeadersType = {
      'Content-Type': 'application/json',
      ...headers,
    }

    const getCookiesStr = () => {
      const cookies: Record<string, string> = {}

      if (this.token) {
        cookies.csrftoken = this.token
      }

      if (this._sessionId) {
        cookies.sessionid = this._sessionId
      }

      return Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
    }

    if (this.token) {
      defaultHeaders['X-CSRFTOKEN'] = this.token
      // defaultHeaders.Authorization = `Bearer ${this.token}`
    }

    if (this._sessionId) {
      defaultHeaders['X-Session-Token'] = this._sessionId
    }

    const cookiesStr = getCookiesStr()
    if (cookiesStr) {
      defaultHeaders.Cookie = cookiesStr
    }

    return defaultHeaders
  }

  public async get<T>(endpoint: string): Promise<StandardResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.getHeader()

    try {
      const response = await fetch(url, {
        headers,
        method: 'GET',
        credentials: 'omit',
      })
      const standardResponse = await handleResponse<T>(response)

      if (standardResponse.result === 'SUCCESS') {
        standardResponse.data = await response.json()
      }

      return standardResponse
    } catch (err) {
      return {
        statusCode: 500,
        result: 'ERROR',
        data: null,
        headers: {},
      }
    }
  }

  public async post<T, U>(endpoint: string, data?: U): Promise<StandardResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.getHeader()

    try {
      const response = await fetch(url, {
        headers,
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'omit',
      })
      const standardResponse = await handleResponse<T>(response)

      if (standardResponse.result === 'SUCCESS') {
        standardResponse.data = await response.json()
      }

      return standardResponse
    } catch (error) {
      return {
        statusCode: 500,
        result: 'ERROR',
        data: null,
        headers: {},
      }
    }
  }

  public async put<T, U>(
    endpoint: string,
    data?: U,
    headers: HeadersType = {},
  ): Promise<StandardResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const combinedHeaders = this.getHeader(headers)

    try {
      const response = await fetch(url, {
        headers: combinedHeaders,
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'omit',
      })
      const standardResponse = await handleResponse<T>(response)

      if (standardResponse.result === 'SUCCESS') {
        standardResponse.data = await response.json()
      }

      return standardResponse
    } catch (err) {
      return {
        statusCode: 500,
        result: 'ERROR',
        data: null,
        headers: {},
      }
    }
  }

  public async delete<T>(endpoint: string): Promise<StandardResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.getHeader()

    try {
      const response = await fetch(url, {
        headers,
        method: 'DELETE',
        credentials: 'omit',
      })
      const standardResponse = await handleResponse<T>(response)

      if (standardResponse.result === 'SUCCESS') {
        standardResponse.data = await response.json()
      }

      return standardResponse
    } catch (err) {
      return {
        statusCode: 500,
        result: 'ERROR',
        data: null,
        headers: {},
      }
    }
  }

  public setToken(token: string) {
    this.token = token
  }

  public getToken() {
    return this.token
  }

  public setSessionId(sessionId: string) {
    this._sessionId = sessionId
  }

  public sessionId() {
    return this._sessionId
  }

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl
    if (token) {
      this.token = token
    }
  }
}

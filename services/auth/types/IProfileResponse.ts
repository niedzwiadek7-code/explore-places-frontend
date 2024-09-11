export type Method = {
  method: string
  at: number
  email: string
}

export type Flow = {
  id: string
  is_pending?: boolean
}

export type IProfileResponse =
  | {
  status: 200,
  data: {
    user: {
      id: number,
      display: string,
      has_usable_password: boolean,
      email: string,
      username: string,
    },
    methods: Array<Method>,
  },
  meta: {
    is_authenticated: boolean,
    session_token: string,
  }
}
  | {
  status: 401,
  data: {
    flows: Array<Flow>,
  },
  meta: {
    is_authenticated: boolean,
    session_token: string,
  }
}

import { RpcError } from './error'

export type RequestParams<T> = {
  [key in keyof T]: string | number | boolean | null
}

export type ResponseOrError<T> = T | { id: string | number; error: RPCError }

type RPCError = {
  code: number
  message: string
  data?: string
}

export default async function tryRequest<T, R extends object>(endpoint: string, data: RequestParams<T>): Promise<R> {
  const url = '/api/orderbook' + endpoint

  const response = await fetch(url, {
    // json-rpc is agnostic to method
    // use POST for JSON param packaging
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(await response.text())
  }
  const resJson: ResponseOrError<R> = await response.json()

  if ('error' in resJson) {
    throw new RpcError(resJson.error.message, resJson.error.code, resJson.error.data)
  }
  return resJson
}

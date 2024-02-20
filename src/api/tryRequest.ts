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

export type RequestOptions = {
  cache?: RequestCache
  method?: 'POST' | 'GET'
}

function formatQueryParams(params: Record<string, string | number | boolean | null | undefined>) {
  return new URLSearchParams(
    Object.entries(params).reduce((q, [k, v]) => (v !== undefined && v !== null ? { ...q, [k]: v.toString() } : q), {})
  ).toString()
}

export default async function tryRequest<T, R extends object>(
  endpoint: string,
  data: RequestParams<T>,
  options?: RequestOptions
): Promise<R> {
  const url = '/api/orderbook' + endpoint
  const cache = options?.cache
  const method = options?.method ?? 'GET'
  let response

  if (method === 'GET') {
    const queryParams = formatQueryParams(data)
    response = await fetch(url + '?' + queryParams, {
      method,
      cache,
    })
  } else {
    response = await fetch(url, {
      // json-rpc is agnostic to method
      // use POST for JSON param packaging
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      cache,
    })
  }

  if (!response.ok) {
    throw new Error(await response.text())
  }
  const resJson: ResponseOrError<R> = await response.json()

  if ('error' in resJson) {
    throw new RpcError(resJson.error.message, resJson.error.code, resJson.error.data)
  }
  return resJson
}

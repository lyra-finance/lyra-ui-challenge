export class RpcError extends Error {
  code: number
  data?: any
  constructor(message: string, code: number, data?: any) {
    super(message)
    this.code = code
    this.data = data
  }

  toString() {
    return `RPCError [${this.code}]: ${this.message} (data: ${JSON.stringify(this.data ?? '')})`
  }
}

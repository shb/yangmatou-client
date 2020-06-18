export type HttpRequest = {
  data: {
    auth_code: string
    biz_content: string
    nonce_str: string
    sign: string
    sign_method: string
    timestamp: string
  }
  headers: Record<string,string>
  method: 'POST'
  url: string
}

export type Signed<T> = T & { sign: string; sign_method: string }

export interface Signature {
  sign<R extends object>(request: R): Signed<R>;
  signMethod: string;
}

export type YMMethod = string

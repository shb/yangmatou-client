import md5 from 'md5'

import { Signature, Signed, YMMethod } from './types'

export type YMRequest = {
  app_id: string
  auth_code: string
  biz_content: string
  method: YMMethod
  nonce_str: string
  timestamp: string
}

export default class Md5Signature implements Signature {
  private app_secret: string

  constructor(conf: { appSecret: string }) {
    this.app_secret = conf.appSecret
  }

  get signMethod(): string {
    return 'MD5'
  }

  sign<R extends object>(request: R): Signed<R> {
    return {
      ...request,
      sign: this.getHash(
        `${this.getQueryString({ ...request, sign_method: 'MD5' })}&app_secret=${this.app_secret}`
      ),
      sign_method: 'MD5'
    }
  }

  private getQueryString(request: object): string {
    return Object.entries(request)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(it => `${it[0]}=${it[1]}`)
      .join('&')
  }

  private getHash(message: string): string {
    return md5(message).toUpperCase()
  }
}

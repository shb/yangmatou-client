import moment from 'moment'

import { HttpRequest } from './types'
import Md5Signature, { YMRequest } from './Md5Signature'

export default class YMClient {
  private app_id: string
  private auth_code: string
  private signature: Md5Signature

  constructor(conf: { appId: string; authCode: string; signature: Md5Signature }) {
    this.app_id = conf.appId
    this.auth_code = conf.authCode
    this.signature = conf.signature
  }

  get appId(): string {
    return this.app_id
  }

  request(method: string, bizContent: object): HttpRequest {
    const body = {
      auth_code: this.auth_code,
      biz_content: JSON.stringify(bizContent),
      nonce_str: this.getNonce(),
      sign_method: this.signature.signMethod,
      timestamp: this.getTimestamp()
    }
    const signedBody = this.signature.sign<YMRequest>({
      ...body,
      app_id: this.app_id,
      method
    })
    return {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      url: `https://open.ymatou.com/apigateway/v1?app_id=${this.app_id}&method=${method}`,
      data: { ...body, sign: signedBody.sign }
    }
  }

  private getNonce(): string {
    let nonce = ''
    for (let i = 0; i < 32; i++) {
      nonce += (Math.random() * 9).toFixed(0).toString()
    }
    return nonce
  }

  private getTimestamp(): string {
    return moment()
      .utcOffset(8)
      .format('YYYY-MM-DD HH:mm:ss')
  }
}

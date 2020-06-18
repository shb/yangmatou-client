import YMSignature, { YMRequest } from './Md5Signature'

describe('YMatou Signature algorithm', () => {
  it('can sign request object', () => {
    const signature = new YMSignature({ appSecret: 'cvxEvN7q2ixmN6Y8DFRJmuP79H2zxctK' })
    const request: YMRequest = {
      app_id: 'zWYVVFagTfenOHDPTm',
      method: 'ymatou.sku.stock.update',
      timestamp: '2017-01-01 12:00:00',
      nonce_str: '3g3jJVfI9CWwKMr45x9SkB0gbi9kAn28',
      auth_code: 'UkeV6CUfk8OKKv1UkjEmfBDU75ZjunA0',
      biz_content:
        '{"sku_stocks": [{"outer_sku_id":"393992","stock_num":10},{"outer_sku_id":"393993","stock_num":12}]}'
    }
    const signed = signature.sign(request)
    expect(signed).toHaveProperty('sign_method', 'MD5')
    expect(signed).toHaveProperty('sign', 'C33DFF4D1A70C9223434DF6ED11635EB')
  })
})

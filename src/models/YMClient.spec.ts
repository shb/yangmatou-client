import sinon from 'sinon'

import YMClient from './YMClient'
import { HttpRequest } from './HttpRequest'
import Md5Signature from './Md5Signature'

describe('YMClient request', () => {
  const app_id = 'zWYVVFagTfenOHDPTm'
  const auth_code = 'ZxMGbblrL8QoWRDPvSKN19eBf4YZBqlA'
  const app_secret = 'cvxEvN7q2ixmN6Y8DFRJmuP79H2zxctK'
  let client: YMClient

  beforeEach(() => {
    client = new YMClient({
      appId: app_id,
      authCode: auth_code,
      signature: new Md5Signature({ appSecret: app_secret })
    })
  })

  it('has POST method and a url woth app_id and API method', () => {
    const request = makeTestRequest()
    expect(request).toBeDefined()
    expect(request.method).toBe(`POST`)
    expect(request.url).toBe(
      `https://open.ymatou.com/apigateway/v1?app_id=${app_id}&method=${method}`
    )
  })

  it('has sign_method = MD5', () => {
    const request = makeTestRequest()
    expect(request).toHaveProperty('data.sign_method', 'MD5')
  })

  it('has the given auth_code', () => {
    const request = makeTestRequest()
    expect(request).toHaveProperty('data.auth_code', auth_code)
  })

  it('has GMT+8 timestamp in SQL format', () => {
    const request = makeTestRequest()
    const hours = getHoursInChina()
    expect(request).toHaveProperty('data.timestamp')
    expect(request.data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    expect(parseInt(request.data.timestamp.split(' ')[1].split(':')[0], 10)).toBe(hours)
  })

  it('has a randomly generated nonce of less than 32 chars', () => {
    const request1 = makeTestRequest()
    expect(request1).toHaveProperty('data.nonce_str')
    expect(request1.data.nonce_str.length).toBeLessThanOrEqual(32)

    const request2 = makeTestRequest()
    expect(request2).toHaveProperty('data.nonce_str')
    expect(request2.data.nonce_str.length).toBeLessThanOrEqual(32)

    expect(request1.data.nonce_str).not.toEqual(request2.data.nonce_str)
  })

  it('contains method payload as JSON string', () => {
    const request = makeTestRequest()
    expect(request).toHaveProperty(
      'data.biz_content',
      '{"sku_stocks":[{"outer_sku_id":"393992","stock_num":10}]}'
    )
  })

  it('has Content-Type: application/json', () => {
    const request = makeTestRequest()
    expect(request).toHaveProperty('headers.Content-Type', 'application/json')
  })

  xtest('Request example', () => {
    const client = new YMClient({
      appId: 'zWYVVFagTfenOHDPTm',
      authCode: 'VlERCP4fZzHzqK7vnr8weOYqepkXriKL',
      signature: new Md5Signature({ appSecret: 'cvxEvN7q2ixmN6Y8DFRJmuP79H2zxctK' })
    })
    sinon.stub(client as any, 'getNonce').returns('3g3jJVfI9CWwKMr45x9SkB0gbi9kAn28')
    sinon.stub(client as any, 'getTimestamp').returns('2017-01-01 12:00:00')
    const request = client.request('ymatou.sku.stock.update', {
      sku_stocks: [
        { outer_sku_id: '393992', stock_num: 10 },
        { outer_sku_id: '393993', stock_num: 12 }
      ]
    })
    expect(request).toHaveProperty('data.sign', 'A950EEDA1342BBDB83AB8C79B759BE44')
  })

  const method = 'ymatou.products.list.get'
  const payload = { sku_stocks: [{ outer_sku_id: '393992', stock_num: 10 }] }
  function makeTestRequest(): HttpRequest {
    return client.request(method, payload)
  }

  function getHoursInChina(offset: number = 8): number {
    const timestamp = new Date()
    return (timestamp.getUTCHours() + offset) % 24
  }
})

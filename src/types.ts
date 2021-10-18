type DateTime = string

type Return<T> = {
  code: 'string'
  message: string
  content: T
}

export type RequestMethod =
  | 'ymatou.products.list.get'
  | 'ymatou.product.detail.get'
  | 'ymatou.order.list.get'
  | 'ymatou.sku.stock.update'
  | 'ymatou.sku.price.update'

export type RequestDTO = {
  'ymatou.products.list.get': {
    product_list?: string[]
    page_no: number
    page_rows: number
    start_updated?: string
    end_updated?: string
  }
  'ymatou.product.detail.get': any
  'ymatou.order.list.get': any
  'ymatou.sku.stock.update': {
    sku_stocks: SKuStock[]
  }
  'ymatou.sku.price.update': any
}

export type SKuStock = {
  outer_sku_id?: string
  sku_id?: string
  stock_num: number
}

export enum DateType {
  OrderGenerationTime = 1,
  OrderPaymentTime = 2,
  OrderShippingTime = 3,
  OrderReceivingTime = 4,
  OrderUpdateTime = 5
}

export enum SortType {
  ReverseOrder = 0,
  AscendingOrder = 1
}

export declare namespace ymatou.order.list.get {
  export type RequestParameters = {
    order_status?: string
    date_type: DateType
    sort_type: SortType
    start_date: DateTime
    end_date: DateTime
    page_no: number
    page_rows: number
    needs_delivery_info?: boolean
  }

  export type ReturnParameter = Return<{
    total: number
    orders_info: OrderInfo[]
  }>

  type OrderInfo = object
}

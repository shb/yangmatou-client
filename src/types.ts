type DateTime = string

type Return<T> = {
  code: 'string'
  message: string
  content: T
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

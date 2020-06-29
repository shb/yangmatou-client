declare type DateTime = string;
declare type Return<T> = {
    code: 'string';
    message: string;
    content: T;
};
export declare enum DateType {
    OrderGenerationTime = 1,
    OrderPaymentTime = 2,
    OrderShippingTime = 3,
    OrderReceivingTime = 4,
    OrderUpdateTime = 5
}
export declare enum SortType {
    ReverseOrder = 0,
    AscendingOrder = 1
}
export declare namespace ymatou.order.list.get {
    type RequestParameters = {
        order_status?: string;
        date_type: DateType;
        sort_type: SortType;
        start_date: DateTime;
        end_date: DateTime;
        page_no: number;
        page_rows: number;
        needs_delivery_info?: boolean;
    };
    type ReturnParameter = Return<{
        total: number;
        orders_info: OrderInfo[];
    }>;
    type OrderInfo = object;
}
export {};

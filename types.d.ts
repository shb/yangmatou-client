declare type DateTime = string;
declare type Return<T> = {
    code: 'string';
    message: string;
    content: T;
};
export declare type RequestMethod = 'ymatou.products.list.get' | 'ymatou.product.detail.get' | 'ymatou.order.list.get' | 'ymatou.sku.stock.update' | 'ymatou.sku.price.update';
export declare type RequestDTO = {
    'ymatou.products.list.get': {
        product_list?: string[];
        page_no: number;
        page_rows: number;
        start_updated?: string;
        end_updated?: string;
    };
    'ymatou.product.detail.get': any;
    'ymatou.order.list.get': any;
    'ymatou.sku.stock.update': {
        sku_stocks: SkuStock[];
    };
    'ymatou.sku.price.update': any;
};
export declare type ProductInfo = {
    category_name: string;
    product_url: string;
    skus: Array<{
        extra_info?: unknown;
        weight_unit: number;
        price: number;
        stock_num: number;
        weight: number;
        new_price: number;
        sku_id: string;
        used: boolean;
        vip_price: number;
        outer_id?: string;
        properties?: Array<{
            name: string;
            pic_url: string;
            value: string;
        }>;
    }>;
    create_time: string;
    listing_start_time: string;
    delivery_company_type: number;
    brand_name: string;
    remark: string;
    product_name: string;
    brand_id: number;
    product_images: string[];
    update_time: string;
    category_id: number;
    delivery_type: number;
    product_id: string;
    delivery_aging: number;
    listing_end_time: string;
    fbx: boolean;
};
export declare type SkuStock = {
    outer_sku_id?: string;
    sku_id?: string;
    stock_num: number;
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

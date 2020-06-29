import { Signature, Signed, YMMethod } from './types';
export declare type YMRequest = {
    app_id: string;
    auth_code: string;
    biz_content: string;
    method: YMMethod;
    nonce_str: string;
    timestamp: string;
};
export default class Md5Signature implements Signature {
    private app_secret;
    constructor(conf: {
        appSecret: string;
    });
    get signMethod(): string;
    sign<R extends object>(request: R): Signed<R>;
    private getQueryString;
    private getHash;
}

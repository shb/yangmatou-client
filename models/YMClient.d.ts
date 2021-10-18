import { HttpRequest } from './types';
import Md5Signature from './Md5Signature';
import { RequestDTO, RequestMethod } from '..';
export default class YMClient {
    private app_id;
    private auth_code;
    private signature;
    constructor(conf: {
        appId: string;
        authCode: string;
        signature: Md5Signature;
    });
    get appId(): string;
    request<T extends RequestMethod>(method: T, bizContent: RequestDTO[T]): HttpRequest;
    private getNonce;
    private getTimestamp;
}

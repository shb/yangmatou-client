import { HttpRequest } from './types';
import Md5Signature from './Md5Signature';
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
    request(method: string, bizContent: object): HttpRequest;
    private getNonce;
    private getTimestamp;
}

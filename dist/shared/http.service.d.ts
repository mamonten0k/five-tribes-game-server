import { RequestConfig } from 'src/utils/types';
export declare class HttpService {
    #private;
    constructor();
    post(url: string, config: RequestConfig): Promise<any>;
    postRows(url: string, config: RequestConfig): Promise<any>;
}

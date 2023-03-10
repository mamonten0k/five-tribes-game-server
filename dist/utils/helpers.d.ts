import { RequestConfig, ResponseData, RowResponseData } from './types';
export declare function parseBearerHeader(req: any): any;
export declare function hashPassword(rawPassword: string): Promise<string>;
export declare function compareHash(rawPassword: string, hashedPassword: string): Promise<boolean>;
export declare function mergeParams(params: object): string;
export declare function updateConfig(config: RequestInit, newConfig: RequestConfig): void;
export declare function toJsonResponse(response: ResponseData): {};
export declare function rowsToJsonResponse(response: RowResponseData): {};
export declare function waitFor(timeout: number): Promise<unknown>;
export declare function transformExistingGames(games_raw: any): {
    games: any[];
};

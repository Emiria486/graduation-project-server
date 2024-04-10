import { StatusCodes } from 'http-status-codes';
interface AppErrorArgs {
    name?: string;
    httpCode: StatusCodes;
    message: string;
    isOperational?: boolean;
}
export declare class AppError extends Error {
    readonly name: string;
    readonly httpCode: StatusCodes;
    readonly isOperational: boolean;
    constructor(args: AppErrorArgs);
}
export {};

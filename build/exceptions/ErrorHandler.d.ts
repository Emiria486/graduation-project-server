import { Response } from 'express';
import { AppError } from './AppError';
declare class ErrorHandler {
    private isTrustedError;
    handleError(err: Error | AppError, res?: Response): void;
    private handleTrustedError;
    private handleCriticalError;
}
export declare const errorHandler: ErrorHandler;
export {};

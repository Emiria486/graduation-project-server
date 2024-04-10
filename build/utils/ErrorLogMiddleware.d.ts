import { NextFunction, Request, Response } from 'express';
declare const ErrorLogMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export default ErrorLogMiddleware;

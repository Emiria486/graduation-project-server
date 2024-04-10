import { NextFunction, Request, Response } from 'express';
declare const RequestLogMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default RequestLogMiddleware;

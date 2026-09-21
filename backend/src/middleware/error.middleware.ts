import type { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    logger.error(message, { status, path: req.path, stack: process.env.NODE_ENV === 'production' ? undefined : err.stack });

    res.status(status).json({ error: message });
}

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({ error: 'Not Found' });
}

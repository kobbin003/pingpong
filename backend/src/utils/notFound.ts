import { NextFunction, Request, Response } from "express";
/**
 * Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error.
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
	// const error = new Error(`Not Found - ${req.originalUrl}`);
	// next(error);
	res.status(404);
	throw new Error(`Not Found --- - ${req.originalUrl}`);
};

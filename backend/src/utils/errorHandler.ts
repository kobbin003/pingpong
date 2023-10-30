import { ErrorRequestHandler, NextFunction, Response } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const isProduction = process.env.NODE_ENV === "production";
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.json({
		error: {
			statusCode,
			msg: err.message,
			stack: isProduction ? null : err.stack,
		},
	});
	next();
};

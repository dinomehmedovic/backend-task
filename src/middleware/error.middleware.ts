import { Request, Response, NextFunction } from "express";
import ApiError from "../common/api-error";

export const errorHandler = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;
  response.status(status).send({ message: error.message });
};

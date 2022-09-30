import { Request, Response, NextFunction } from "express";
import Errors from "../common/errors";

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const error = Errors.NOT_FOUND;

  response.status(error.statusCode).send({ message: error.message });
};

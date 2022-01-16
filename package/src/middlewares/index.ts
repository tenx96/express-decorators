import { IErrorMiddleware } from "../interfaces";
import { HttpErrorResponse } from "../models";
export const defaultHttpErrorMiddleware: IErrorMiddleware = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof HttpErrorResponse) {
    return res.status(err.status).json({
      message: err.phrase,
      error: err.message,
      data: err.data,
    });
  } else {
    next(err);
  }
};

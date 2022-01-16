import { IErrorMiddleware, IMiddleware } from "../interfaces";
import { HttpErrorResponse } from "../models";
import { ValidationError, Validator, ValidatorOptions } from "class-validator";
import { ClassConstructor, plainToClass } from "class-transformer";
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

export const defaultValidationErrorHandler: IErrorMiddleware = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof Array && err[0] instanceof ValidationError) {
    next(HttpErrorResponse.BAD_REQUEST("Validation error", err));
  } else {
    next(err);
  }
};


export const generateValidationMiddleware = (
    type: ClassConstructor<any>,
    options?: ValidatorOptions
  ): IMiddleware => {
    let validator = new Validator();

    return (req, res, next) => {
      let input: any = plainToClass(type, req.body, {
        ignoreDecorators: true,
      });

      // set forbid unknown as default
      if (!options) {
        options = {
          whitelist: true,
          forbidNonWhitelisted: true,
          forbidUnknownValues: true,
        };
      }

      let errors = validator.validateSync(input, options);

      if (errors.length > 0) {
        next(errors);
      } else {
        req.body = input;
        next();
      }
    };
  }
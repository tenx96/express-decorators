import { ClassConstructor } from "class-transformer";
import { ValidatorOptions } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HTTP_METHOD } from "../decorators/meta-keys";

export interface IParamsMetaData {
  bodyIndex: number | undefined;
  paramsIndex: number | undefined;
  queryIndex: number | undefined;
  fileIndex: number | undefined;
  filesIndex: number | undefined;
}

export interface IFunctionMetaData {
  method: HTTP_METHOD;
  path: string;
  methodName: string;
  middlewares: IMiddleware[];
  errorMiddlewares: IErrorMiddleware[];
  paramsMetadata: IParamsMetaData;
  validation? : {
    schema : ClassConstructor<any>
    options ?: ValidatorOptions
  }
}

export interface IControllerMetadata {
  errorMiddlewares: IErrorMiddleware[];
  baseUrl: string;
  middlewares: IMiddleware[];
  validation? : {
    schema : ClassConstructor<any>
    options ?: ValidatorOptions
  }
}

export type IMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;
export type IErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => any;

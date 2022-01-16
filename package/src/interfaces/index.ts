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
  errorMiddlewares: IErrorMiddleware[];
  paramsMetadata: IParamsMetaData;
  customMiddlewares?: {
    builder: (...args: any[]) => IMiddleware;
    args: any[];
  }[];
}

export interface IControllerMetadata {
  errorMiddlewares: IErrorMiddleware[];
  baseUrl: string;
  customMiddlewares?: {
    builder: (...args: any[]) => IMiddleware;
    args: any[];
  }[];
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

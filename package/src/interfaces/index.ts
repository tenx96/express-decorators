import { NextFunction, Request, Response } from "express";
import { HTTP_METHOD } from "../decorators/meta-keys";

export interface IParamsMetaData {
  path : string,
  parameterIndex : number
}



export interface IFunctionMetaData {
  method: HTTP_METHOD;
  path: string;
  methodName: string;
  errorMiddlewares: IErrorMiddleware[];
  customMiddlewares?: {
    builder: (...args: any[]) => IMiddleware;
    args: any[];
  }[];

  customParameters?: IParamsMetaData[];
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

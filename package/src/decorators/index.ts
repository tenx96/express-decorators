import { IErrorMiddleware } from "../interfaces";
import { createParamDecorator } from "./generated/paramGenerator";
import {
  setClassMetadata,
  setMethodMetadata,
  setErrorMiddlewareData,
} from "./meta-helpers";
import { HTTP_METHOD } from "./meta-keys";

export * from "./generated/middleware";
//FUNCTION LEVELS
// HTTP_METHODS ----------------------------------------
export const post = (path: string): MethodDecorator => {
  return (target, key, desc) => {
    setMethodMetadata(HTTP_METHOD.POST, path, target, key);
  };
};

export const get = (path: string): MethodDecorator => {
  return (target, key, desc) => {
    setMethodMetadata(HTTP_METHOD.GET, path, target, key);
  };
};

export const del = (path: string): MethodDecorator => {
  return (target, key, desc) => {
    setMethodMetadata(HTTP_METHOD.DELETE, path, target, key);
  };
};

export const patch = (path: string): MethodDecorator => {
  return (target, key, desc) => {
    setMethodMetadata(HTTP_METHOD.PATCH, path, target, key);
  };
};

export function errMiddleware(...args: IErrorMiddleware[]): Function {
  return (target: Object, propertyKey?: string | symbol) => {
    setErrorMiddlewareData(target, args, propertyKey);
  };
}

// CLASS  ----------------------------------------
export const controller = (baseUrl: string): ClassDecorator => {
  return (target: Object) => {
    setClassMetadata(baseUrl, target);
  };
};

// PARAMS
export const reqBody = createParamDecorator("body");
export const reqParam = createParamDecorator("params");
export const reqQuery = createParamDecorator("query");
export const reqFile = createParamDecorator("file");
export const reqFiles = createParamDecorator("files");

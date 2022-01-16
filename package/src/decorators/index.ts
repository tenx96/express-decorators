import { IErrorMiddleware } from "../interfaces";
import {
  setClassMetadata,
  setMethodMetadata,
  setErrorMiddlewareData,
  setParamMetadata,
} from "./meta-helpers";
import { HTTP_METHOD, PARAM_TYPE } from "./meta-keys";

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
export function reqBody(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  setParamMetadata(PARAM_TYPE.BODY, target, key, parameterIndex);
}

export function reqParam(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  setParamMetadata(PARAM_TYPE.PARAMS, target, key, parameterIndex);
}

export function reqQuery(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  setParamMetadata(PARAM_TYPE.QUERY, target, key, parameterIndex);
}

export function reqFile(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  setParamMetadata(PARAM_TYPE.FILE, target, key, parameterIndex);
}

export function reqFiles(
  target: Object,
  key: string | symbol,
  parameterIndex: number
) {
  setParamMetadata(PARAM_TYPE.FILES, target, key, parameterIndex);
}

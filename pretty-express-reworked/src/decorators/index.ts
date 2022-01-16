import { IErrorMiddleware, IMiddleware } from "../interfaces";
import {
  setClassMetadata,
  setMethodMetadata,
  setMiddlewareMetadata,
  setParamMetadata,
  setValidationMetadata,
} from "./meta-helpers";
import { HTTP_METHOD, PARAM_TYPE } from "./meta-keys";
import { ClassConstructor } from "class-transformer";
import { ValidatorOptions } from "class-validator";



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

//FUNCTION + CLASS LEVEL
export function middleware(...args: IMiddleware[]): Function {
  return (target: Object, propertyKey?: string | symbol) => {
    setMiddlewareMetadata(target,args,false, propertyKey,);
  };
}

export function errMiddleware(...args: IErrorMiddleware[]): Function {
  return (target: Object, propertyKey?: string | symbol) => {
    setMiddlewareMetadata(target,args,true, propertyKey,);
  };
}


export function validate(
  schema: ClassConstructor<any>,
  options?: ValidatorOptions
): Function {
  return (target: Object, propertyKey?: string | symbol) => {
      setValidationMetadata(target,schema,propertyKey,options)
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

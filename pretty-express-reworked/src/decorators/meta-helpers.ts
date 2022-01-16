import { ClassConstructor } from "class-transformer";
import { ValidatorOptions } from "class-validator";
import {
  IControllerMetadata,
  IFunctionMetaData,
  IMiddleware,
  IParamsMetaData,
} from "../interfaces";
import * as META_KEYS from "./meta-keys";
import { HTTP_METHOD } from "./meta-keys";
// SETTERS --------------------------------------------------------------------
/**
 * sets method : Request method, GET POST etc,
 * path : path of url,
 * key : key of function
 * meta data, will be used to call this function from controllers
 * @param method
 * @param path
 * @param target
 * @param key
 */

export const setMethodMetadata = (
  method: HTTP_METHOD,
  path: string,
  target: any,
  key: string | symbol
) => {
  Reflect.defineMetadata(META_KEYS.REQUEST_METHOD_KEY, method, target, key);
  Reflect.defineMetadata(META_KEYS.REQUEST_PATH_KEY, path, target, key);
};

/**
 * set middleware meta data, value is an array of middleware functions.
 * This decorator may be used on Class or Function Level so we have to set key for function level and no key for Class level
 *
 * @param target
 * @param middlewares
 * @param isError  defines whether the middleware is an error or normal middleware.
 * error middleware (err,req,...) =>
 * normal Middleware  (req,res,next) =>
 * @param key
 */

export const setMiddlewareMetadata = (
  target: any,
  middlewares: Function[],
  isError: boolean,
  key?: string | symbol
) => {
  if (isError) {
    if (key) {
      Reflect.defineMetadata(
        META_KEYS.ERROR_MIDDLEWARE_KEY,
        middlewares,
        target,
        key
      );
    } else {
      Reflect.defineMetadata(
        META_KEYS.ERROR_MIDDLEWARE_KEY,
        middlewares,
        target
      );
    }
  } else {
    if (key) {
      Reflect.defineMetadata(
        META_KEYS.MIDDLEWARE_KEY,
        middlewares,
        target,
        key
      );
    } else {
      Reflect.defineMetadata(META_KEYS.MIDDLEWARE_KEY, middlewares, target);
    }
  }
};

/**
 * sets validation schema , options as metadata from function or class level
 * @param target
 * @param key
 * @param schema
 * @param options
 */
export const setValidationMetadata = (
  target: Object,
  schema: ClassConstructor<any>,
  key?: string | symbol,
  options?: ValidatorOptions
) => {
  if (key) {
    // key is undefined in case of Class level validator
    Reflect.defineMetadata(META_KEYS.VALID_SCHEMA_KEY, schema, target, key);
    Reflect.defineMetadata(META_KEYS.VALID_OPTIONS_KEY, options, target, key);
  } else {
    Reflect.defineMetadata(META_KEYS.VALID_SCHEMA_KEY, schema, target);
    Reflect.defineMetadata(META_KEYS.VALID_OPTIONS_KEY, options, target);
  }
};

/**
 * sets baseUrl in Class Metadata
 * @param baseUrl
 * @param target
 */
export const setClassMetadata = (baseUrl: string, target: Object) => {
  Reflect.defineMetadata(META_KEYS.ROUTER_URL_KEY, baseUrl, target);
};

export const setParamMetadata = (
  paramType: META_KEYS.PARAM_TYPE,
  target: Object,
  key: string | symbol,
  parameterIndex: number
) => {
  Reflect.defineMetadata(paramType, parameterIndex, target, key);
};

// GETTERS --------------------------------------------------------------------

/**
 *
 * @param target
 * @returns returns the values method,path,key set on controller functions using metadata
 */
export const getMethodMetadata = (target: Object): IFunctionMetaData[] => {
  const prototype = Object.getPrototypeOf(target);

  const propertyNames = Object.getOwnPropertyNames(prototype); // get list of functions for controller/class
  propertyNames.splice(0, 1); //remove 1st element, key : constructor
  const data: IFunctionMetaData[] = [];
  propertyNames.forEach((properyName) => {
    const method = Reflect.getOwnMetadata(
      META_KEYS.REQUEST_METHOD_KEY,
      prototype,
      properyName
    );
    const path = Reflect.getOwnMetadata(
      META_KEYS.REQUEST_PATH_KEY,
      prototype,
      properyName
    );

    const middlewares =
      Reflect.getOwnMetadata(
        META_KEYS.MIDDLEWARE_KEY,
        prototype,
        properyName
      ) || [];

    const errorMiddlewares =
      Reflect.getOwnMetadata(
        META_KEYS.ERROR_MIDDLEWARE_KEY,
        prototype,
        properyName
      ) || [];

    const vSchema =
      Reflect.getOwnMetadata(
        META_KEYS.VALID_SCHEMA_KEY,
        prototype,
        properyName
      ) || undefined;

    const vOptions =
      Reflect.getOwnMetadata(
        META_KEYS.VALID_OPTIONS_KEY,
        prototype,
        properyName
      ) || undefined;
    data.push({
      method,
      path,
      methodName: properyName,
      middlewares,
      paramsMetadata: getParamMetaData(prototype, properyName),
      errorMiddlewares,
      ...(vSchema && {
        validation: { //set validation only when schema is available
          schema: vSchema,
          options: vOptions,
        },
      }),
    });
  });

  return data;
};

/**
 *
 * @param target
 * @param key
 * @returns fetches the index of decorated function params if available
 *
 */
export const getParamMetaData = (
  target: Object,
  key: string
): IParamsMetaData => {
  const bodyIndex = Reflect.getOwnMetadata(
    META_KEYS.PARAM_TYPE.BODY,
    target,
    key
  );
  const paramsIndex = Reflect.getOwnMetadata(
    META_KEYS.PARAM_TYPE.PARAMS,
    target,
    key
  );
  const queryIndex = Reflect.getOwnMetadata(
    META_KEYS.PARAM_TYPE.QUERY,
    target,
    key
  );
  const fileIndex = Reflect.getOwnMetadata(
    META_KEYS.PARAM_TYPE.FILE,
    target,
    key
  );
  const filesIndex = Reflect.getOwnMetadata(
    META_KEYS.PARAM_TYPE.FILES,
    target,
    key
  );

  return {
    bodyIndex,
    paramsIndex,
    queryIndex,
    fileIndex,
    filesIndex,
  };
};

/**
 *
 * @param target
 * @returns returns the data set on class level, Controllers. returns baseUrl
 */
export const getClassMetadata = (target: Object): IControllerMetadata => {
  const constructor = Object.getPrototypeOf(target).constructor;
  const baseUrl =
    Reflect.getOwnMetadata(META_KEYS.ROUTER_URL_KEY, constructor) || "/";
  const middlewares = Reflect.getOwnMetadata(
    META_KEYS.MIDDLEWARE_KEY,
    constructor
  );
  const errorMiddlewares = Reflect.getOwnMetadata(
    META_KEYS.ERROR_MIDDLEWARE_KEY,
    constructor
  );

  const vSchema = Reflect.getOwnMetadata(
    META_KEYS.VALID_SCHEMA_KEY,
    constructor
  );

  const vOptions = Reflect.getOwnMetadata(
    META_KEYS.VALID_OPTIONS_KEY,
    constructor
  );
  return {
    baseUrl,
    middlewares: middlewares || [],
    errorMiddlewares: errorMiddlewares || [],
    ...(vSchema && {validation : {
      schema : vSchema,
      options : vOptions
    }})
  };
};

import { IMiddleware } from "../../interfaces/base.interface";
import * as META_KEYS from "../meta-keys";
export type IMethodDecorator<T extends any[]> = (args: T) => IMiddleware;


// set custom middleware data to handler
const setCustomMiddlewareData = <T extends any[]>(
  target: Object,
  builder: IMethodDecorator<T>,
  args: any[],
  propertyKey?: string | symbol
) => {
  let arr: any[] = getCustomMiddlewareData(target, propertyKey) || [];
  arr.push({
    builder,
    args: args || [],
  });

  if (propertyKey) {
    Reflect.defineMetadata(
      META_KEYS.CUSTOM_MIDDL_LIST_KEY,
      arr,
      target,
      propertyKey
    );
  } else {
    Reflect.defineMetadata(META_KEYS.CUSTOM_MIDDL_LIST_KEY, arr, target);
  }
};


// push a list of middlewares to custom middleware data
const setCustomMiddlareFromList = (
  target: Object,
  middlewares: IMiddleware[],
  propertyKey?: string | symbol
) => {
  let arr: any[] = getCustomMiddlewareData(target, propertyKey) || [];

  middlewares.forEach((item) => {
    arr.push(item);
  });

  if (propertyKey) {
    Reflect.defineMetadata(
      META_KEYS.CUSTOM_MIDDL_LIST_KEY,
      arr,
      target,
      propertyKey
    );
  } else {
    Reflect.defineMetadata(META_KEYS.CUSTOM_MIDDL_LIST_KEY, arr, target);
  }
};


// get middlewares data
export const getCustomMiddlewareData = (
  target: Object,
  propertyKey?: string | symbol
) => {
  let data = [];

  if (propertyKey) {
    data = Reflect.getOwnMetadata(
      META_KEYS.CUSTOM_MIDDL_LIST_KEY,
      target,
      propertyKey
    );
  } else {
    const constructor = Object.getPrototypeOf(target).constructor;
    data = Reflect.getOwnMetadata(META_KEYS.CUSTOM_MIDDL_LIST_KEY, constructor);
  }
  return data || [];
};

export const createMiddlewareDecorator =
  <T extends any[]>(middlewareBuilder: IMethodDecorator<T> | IMiddleware[]) =>
  (...args: T) => {
    return (target: Object, propertyKey?: string | symbol) => {
      if (!Array.isArray(middlewareBuilder)) {
        
        // if args is a builder create a middleware with it and push it
        setCustomMiddlewareData<T>(target, middlewareBuilder, args, propertyKey);

      } else {
        // if args is a list of middlewares push it
        setCustomMiddlareFromList(target, middlewareBuilder, propertyKey);
      }
    };
  };

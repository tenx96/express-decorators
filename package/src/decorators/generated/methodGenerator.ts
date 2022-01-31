import { IMiddleware } from "../../interfaces/base.interface";
import * as META_KEYS from "../meta-keys";
export type IMiddlewareBuilder<T extends any[]> = (
  args: T
) => IMiddleware | IMiddleware[];

// set custom middleware data to handler
const setCustomMiddlewareData = <T extends any[]>(
  target: Object,
  builder: IMiddlewareBuilder<T>,
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
    // item is a generic middleware which require no args

    arr.push({
      args: [],
      builder: () => item,
    });
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
  <T extends any[]>(middlewareBuilder: IMiddlewareBuilder<T>) =>
  (...args: T) => {
    return (target: Object, propertyKey?: string | symbol) => {
      setCustomMiddlewareData<T>(target, middlewareBuilder, args, propertyKey);
    };
  };

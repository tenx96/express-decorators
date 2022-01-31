import { IMiddleware } from "../../interfaces";
import { createMiddlewareDecorator } from "./methodGenerator";

export const middleware =
  createMiddlewareDecorator<[...IMiddleware[]]>((middlewareArray) => {
    return middlewareArray;
  });

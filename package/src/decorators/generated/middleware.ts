import { IMiddleware } from "../../interfaces";
import { createMiddlewareDecorator } from "./methodGenerator";

export const middleware: (...middleware: IMiddleware[]) => any =
  createMiddlewareDecorator<any>((middlewareArray) => {
    return middlewareArray;
  });

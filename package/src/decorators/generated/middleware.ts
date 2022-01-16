import { IMiddleware } from "../../interfaces";
import { createMiddlewareDecorator } from "./generator";

export const middleware: (...middleware: IMiddleware[]) => any =
  createMiddlewareDecorator((middlewareArray) => {
    return middlewareArray;
  });

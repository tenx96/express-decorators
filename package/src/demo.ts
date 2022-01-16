import { createMiddlewareDecorator } from "./decorators/generated/generator";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import {
  controller,
  middleware,
  post,
  reqBody,
  reqParam,
  reqQuery,
} from "./decorators";
import { getClassMetadata, getMethodMetadata } from "./decorators/meta-helpers";
import { combineControllers } from "./generators/controller.generator";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sampleMiddleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("sample middleware1");
  next();
};

const sampleMiddleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("sample middleware2");
  next();
};

const auth = createMiddlewareDecorator((args) => {
  return (req, res, next) => {
    console.log("Authenticating....");
    next();
  };
});

const valid = createMiddlewareDecorator((args) => {
  return (req, res, next) => {
    console.log("Validating....", args);
    next();
  };
});

@controller("/")
class DemoController {
  @middleware(sampleMiddleware1, sampleMiddleware2)
  @auth()
  @valid("123")
  @post("/hello")
  demo(@reqParam param1: any, @reqQuery param2: any, @reqBody param3: any) {
    return { message: "Hello" };
  }
  @post("/test")
  test(@reqQuery query: any, @reqBody body: any, req: Request) {
    console.log("query : ", query);
    console.log("body : ", body);

    console.log("Calling Function test");
    return body;
  }
}

const demoController = new DemoController();
const demoRouter = combineControllers([demoController], {
  skipDefaultHttpErrorMiddleware: false,
});

app.use(demoRouter);

// console.log("Class DATA , ", getClassMetadata(demoController));
// console.log("Func DATA , ", getMethodMetadata(demoController));

app.listen(8000, () => {
  console.log("Listening http://localhost:8000");
});

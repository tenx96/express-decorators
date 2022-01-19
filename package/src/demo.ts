import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import {
  combineControllers,
  controller,
  createMiddlewareDecorator,
  createParamDecorator,
  get,
  reqBody,
  reqQuery,
} from "./";
import { getClassMetadata, getMethodMetadata } from "./decorators/meta-helpers";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwtAuth = createMiddlewareDecorator<[role: string]>((args) => {
  return (req, res, next) => {
    console.log("ARGS , ", args);
    next();
  };
});

const authData = createParamDecorator("authUser");

@controller("/")
@jwtAuth("admin")
export class SampleController {
  @jwtAuth("user")
  @get("/auth")
  getUsers(@authData authData: any, req: any) {
    console.log("REQ : ", req.someData);

    return { msg: "Hello world", data: authData };
  }

  @get("/test")
  test(@authData authData: any, req: any) {
    console.log("REQ : ", req.someData);

    return { msg: "Hello world", data: authData };
  }
}

@jwtAuth("user")
@controller("/admin")
export class SampleController2 {
  @jwtAuth("user")
  @get("/auth")
  getUsers(@authData authData: any, req: any) {
    return { msg: "passed middleware leval auth ", data: authData };
  }

  @jwtAuth("user")
  @get("/")
  getAdmins(@authData authData: any, req: any) {
    return { msg: "passed middleware leval auth ", data: authData };
  }

  @get("/class")
  passClass(@authData authData: any) {
    return { msg: "passed class level auth", data: authData };
  }

  @get("/1")
  test1(@authData authData: any) {
    return { msg: "passed class level auth", data: authData };
  }

  @get("/1")
  test333(@authData authData: any) {
    return { msg: "passed class level auth", data: authData };
  }
}

const demoController = new SampleController();
const demoController2 = new SampleController2();
const demoRouter = combineControllers([demoController2, demoController, ], {
  skipDefaultHttpErrorMiddleware: false,
});

app.use(demoRouter);

console.log("Class DATA 1, %o", getClassMetadata(demoController));
console.log("Func DATA 1, %o", getMethodMetadata(demoController));

console.log("Class DATA 2, %o", getClassMetadata(demoController2));
console.log("Func DATA 2, %o", getMethodMetadata(demoController2));

app.listen(8000, () => {
  console.log("Listening http://localhost:8000");
});

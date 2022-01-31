import express from "express";
import "reflect-metadata";
import {
  combineControllers,
  controller,
  createMiddlewareDecorator,
  createParamDecorator,
  get,
} from "./";
import { middleware } from "./decorators";
import { getClassMetadata, getMethodMetadata } from "./decorators/meta-helpers";
import { IMiddleware } from "./interfaces";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwtAuth = createMiddlewareDecorator<[role: string]>((args) => {
  return (req: any, res, next) => {
    console.log("ARGS , ", args);
    req.authData = { email: "jugga@redoc.mh" };
    next();
  };
});

const middleware1: IMiddleware = (req, res, next) => {
  console.log("Inside middleware 1");
  next();
};

const middleware2: IMiddleware = (req, res, next) => {
  console.log("Inside middleware 2");
  next();
};

const authData = createParamDecorator("authData");

@controller("/")
export class SampleController {

  @jwtAuth("user")
  @middleware(middleware1 , middleware2)
  @get("/auth")
  getUsers(@authData authData: any, req: any) {
    console.log("REQ : ", req.authData);
    return { msg: "Hello world", data: authData };
  }
}

const demoController = new SampleController();
const demoRouter = combineControllers([demoController]);

app.use(demoRouter);

console.log("Class DATA 1, %o", getClassMetadata(demoController));
console.log("Func DATA 1, %o", getMethodMetadata(demoController));

app.listen(8000, () => {
  console.log("Listening http://localhost:8000");
});

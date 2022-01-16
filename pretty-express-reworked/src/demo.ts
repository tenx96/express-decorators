import { IsOptional, IsString} from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import {
  controller,
  errMiddleware,
  middleware,
  post,
  reqBody,
  reqParam,
  reqQuery,
  validate
} from "./decorators";
import { getClassMetadata, getMethodMetadata } from "./decorators/meta-helpers";
import { combineControllers } from "./generators/controller.generator";
import { HttpErrorResponse } from "./models";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("sample middleware");
  next();
};

const sampleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("sample error middleware");

  return res.status(400).json({
    message: "Message from error middleware",
  });
  next();
};


class NestedObject {
  @IsString()
  prop1: string;

  @IsOptional()
  @IsString()
  prop2: string;
}

@middleware(sampleMiddleware)
@validate(NestedObject)
@controller("/")
class DemoController {
  @middleware(sampleMiddleware)
  @errMiddleware(sampleErrorMiddleware)
  @post("/hello/:helloId")
  demo(@reqParam param1: any, @reqQuery param2: any, @reqBody param3: any) {
    throw new Error("test error");
    return { message: "Hello" };
  }

  @validate(NestedObject)
  @post("/test")
  test() {
    console.log("Calling Function test");
    return { test: "test" };
  }
}

@middleware(sampleMiddleware)
@controller("/auth")
class AuthController {
  @middleware(sampleMiddleware)
  @errMiddleware(sampleErrorMiddleware)
  @post("/hello/:helloId")
  demo(@reqParam param1: any, @reqQuery param2: any, @reqBody param3: any) {
    throw new Error("test error");
    return { message: "Hello" };
  }

  @post("/test")
  test() {
    console.log("Calling Function test");
    throw HttpErrorResponse.BAD_REQUEST("Error occured", { created: "false" });
  }
}

const demoController = new DemoController();
const authController = new AuthController();
const demoRouter = combineControllers([demoController, authController], {
  skipDefaultHttpErrorMiddleware : false
});

app.use(demoRouter);


// console.log("Class DATA , " ,getClassMetadata(demoController))
// console.log("Func DATA , " ,getMethodMetadata(demoController))

app.listen(8000, () => {
  console.log("Listening http://localhost:8000");
});

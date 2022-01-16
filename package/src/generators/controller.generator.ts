import { NextFunction, Request, Response, Router } from "express";
import {
  getClassMetadata,
  getMethodMetadata,
} from "../decorators/meta-helpers";
import { IMiddleware, IParamsMetaData } from "../interfaces";
import {
  defaultHttpErrorMiddleware,
} from "../middlewares";
import { HttpResponse } from "../models";

/**
 * generate a router after combining multiple routers generated from controllers
 * @param target
 * @returns
 */

export const combineControllers = (
  controllers: Object[],
  options?: {
    skipDefaultHttpErrorMiddleware?: boolean;
  }
) => {
  const router = Router();

  controllers.forEach((item) => {
    router.use(generateRouter(item));
  });

// set default http errors | errors of type HttpErrorResponse
  if (!options || (options && !options.skipDefaultHttpErrorMiddleware)) {
    router.use(defaultHttpErrorMiddleware);
  }

  return router;
};

export const generateRouter = (controller: any) => {
  const router = Router();

  const funcData = getMethodMetadata(controller);
  const classData = getClassMetadata(controller);


  // CURRENT MIDDLEWARE ORDER --> CUSTOM --> VALIDATION --> MIDDLEWARES

  // insert custom middlewares
  if (classData.customMiddlewares && classData.customMiddlewares.length > 0) {
    let customMiddlewares = classData.customMiddlewares.map((item) =>
      item.builder(item.args)
    );
    router.use(...customMiddlewares);
  }


  funcData.forEach((item) => {
    const funcName: any = item.methodName;

    // prepare custom middlewares
    let customMiddlewares: IMiddleware[] = [];
    if (item.customMiddlewares && item.customMiddlewares.length > 0) {
      item.customMiddlewares.forEach((item) => {
        customMiddlewares.push(item.builder(item.args));
      });
    }

    // CURRENT MIDDLEWARE ORDER --> CUSTOM --> VALIDATION --> MIDDLEWARES --> ERRORMIDDLEWARES
    // @INFO Here we call the main controller function
    router[item.method](
      item.path,
      ...customMiddlewares,
      generateRequestHandler(controller[funcName], item.paramsMetadata),
      ...[item.errorMiddlewares]
    );
  });


  // Class level error middlewares marked with @errMiddleware
  if (classData.errorMiddlewares.length !== 0) {
    router.use(...classData.errorMiddlewares);
  }

  const finalRouter = Router();
  finalRouter.use(classData.baseUrl, router);

  return finalRouter;
};

/**
 * generates a middleware using decorated function and params
 * @param controllerFunction
 * @returns
 */
export const generateRequestHandler = (
  controllerFunction: Function,
  paramsIndex: IParamsMetaData
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const sortedParams = generateSortedParams(req, res, next, paramsIndex);

      const controllerValue = controllerFunction(...sortedParams);

      if (controllerValue instanceof HttpResponse) {
        return res.status(controllerValue.status).json(controllerValue.json);
      } else {
        // return a status 200 and json as returned value by default
        return res.status(200).json(controllerValue);
      }
    } catch (err) {
      next(err);
    }
  };
};

/**
 * get sorted params to destructure to controller function as params
 * @param req
 * @param res
 * @param next
 * @param paramsIndex
 */
const generateSortedParams = (
  req: any,
  res: Response,
  next: NextFunction,
  paramsIndex: IParamsMetaData | any
): any => {
  const { body, params, query, file, files } = req;

  const sortedParams: { weight: number; value: any; key?: string }[] = [
    {
      value: req,
      weight: 100,
    },
    {
      value: res,
      weight: 101,
    },
    {
      value: next,
      weight: 102,
    },
  ];

  Object.keys(paramsIndex)
    .filter((item) => paramsIndex[item] !== undefined)
    .forEach((key) => {
      let value: any = null;
      if (key === "bodyIndex") {
        value = body;
      }
      if (key === "paramsIndex") {
        value = params;
      }
      if (key === "queryIndex") {
        value = query;
      }
      if (key === "fileIndex") {
        value = file;
      }
      if (key === "filesIndex") {
        value = files;
      }

      sortedParams.push({
        weight: paramsIndex[key],
        value,
        key,
      });
    });

  sortedParams.sort((a, b) => a.weight - b.weight);
  const finalParams = sortedParams.map((item) => item.value);
  return finalParams;
};

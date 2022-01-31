## Pretty Express

A typescript library to write express Controllers and Middlewares.

pretty-express also provides versatility by providing methods to write your own decorator middlewares which can be used to encapsulate complicated middlewares behind simple/readable decorators.

See this section on [custom middlewares](#writing-your-own-custom-parameter-decorator)

## Sections 

[Creating a controller](#api-details) <br>
[Route Decorators](#route-decorators) <br>
[Middleware Decorators](#middleware-decorator) <br>
[Returning a response](#returning-a-response) <br>
[Parameter Decorators](#parameter-decorators) <br>
[Custom Middleware decorator](#writing-your-own-middleware-decorator) <br>
[Custom Parameter decorator](#writing-your-own-custom-parameter-decorator) <br>
[Order of middleware execution](#order-of-middleware-execution) <br>



**Setup your typescript project and install pretty express**

1: In your tsconfig add the following,

```bash
"experimentalDecorators":  true,
"emitDecoratorMetadata":  true ,
```

2: Install reflect-metadata and pretty-express

```bash
npm install reflect-metadata pretty-express
```

3: On your entry file (eg : index.ts) initialize reflect-metadata

```typescript
	import "reflect-metadata"
	.
	.
	... <reset of the code here>
```

**Write your controller**

```typescript
@controller("/users")
export class UserController {
  @get("/")
  getUsers() {
    return { message: "Users data" };
  }
}
```

**Generate a router and use it on your express application**

```typescript
const userController = new UserController();
const router = combineControllers([userController]);
app.use(router);
```

**Your final Final code**

```typescript
import "reflect-metadata";
import express from "express";
import { combineControllers, controller, get } from "pretty-express";
// Controller class

@controller("/users")
export class UserController {
  @get("/")
  getUsers() {
    return { message: "Users data" };
  }
}
// express initialization
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// INITIALIZE CONTROLLERS
const userController = new UserController();
const router = combineControllers([userController]);
app.use(router);

// listen on port
app.listen(7000, () => {
  console.log("Listening on http://localhost:7000");
});
```

**Call your new users api**

```typescript
curl --location --request GET 'http://localhost:7000/users'
{"message":"Users data"}
```

## Api Details

**The @controller decorator**

```typescript
@controller(path : string)
```

Specifies a class as a controller and use route decorators inside it to create apis.

eg :

```typescript
@controller("/users")
export class UserController {
  @get("/")
  getUsers() {
    return { message: "Users data" };
  }
}
```

## Route Decorators
| Decorators | Function |
|--|--|
`@get(path : string)` |create a GET route on specified path |
|`@post(path : string)`|create a POST route on specified path|
|`@patch(path : string)` |create a PATCH route on specified path|
|`@del(path : string)`|create a DELETE route on specified path|

## Middleware decorator
Adds a middleware/s to a route,
accepts one or multiple middlewares as an argument

```typescript
@middleware(middlewares : ...(req,res,next) => void)
```

```typescript
>>>>>>
const  authMiddleware  = (req :Request, res:Response, next:NextFunction) => {
console.log("Authenticating...")
next()
}


>>>>>>

	@middleware(authMiddleware)
	@post("/new")
	createUser(){
	return {
	message  :  "Created new user;"
	}



}
```

You can also pass multiple middlewares on this decorator.
The middlewares will be executed based on the order in the params.

Example :

```typescript
@middleware(firstMiddleware,secondMiddleware)
```

here `firstMiddleware` will be executed first followed by `secondMiddleware`

Similary we can assign errorMiddlewares using the `@errMiddleware` decorator

eg

```typescript
const  errorMiddleware  = (err:  Error,req  :  Request,res  :  Response,next  :  NextFunction) => {
	console.log("Handling error...")
	next()
}
>>>>
@errMiddleware(errorMiddleware)
@post("/delete")
deleteUser(){
	return {
	message  :  "Deleted user;"
	}
}
```

Like @middleware we can also pass multiple error handlers in order

```typescript
@errMiddleware(firstMiddleware,secondMiddleware)
```

we can also use both `@middleware` and `@errMiddleware` on the class/controller level.
This will assign this middlewares on all the routes inside it.

```typescript
@middleware(sampleMiddleware)
@controller("/users")
export  class  UserController {
@get("/")
getUsers() {
return { message:  "Users data" };
}
>>>
```

## returning a response

> By default the returned object of a decorated fucntion is returned as a JSON object with a status : 200

```typescript
  @del("/")
  async someFunction(req: Request, res: Response, next: NextFunction) {
    return { method: "delete" };
  }
```

> To return a response with a custom status code. Simply return an object of type `HttpResponse(status, object)`

```typescript
  @post("/")
  async someFunction(req: Request, res: Response, next: NextFunction) {
    return new HttpResponse(201, { message: "created" });
  }
```

> to return an error response, throw an error of type `HttpErrorResponse`

```typescript
  @patch("/")
  async someFunction(req: Request, res: Response, next: NextFunction) {
    throw new HttpErrorResponse(400, "Hello Error!");
  }
```

> You can also automatically get the status codes from static methods provided in `HttpErrorResponse` and `HttpResponse`.

```typescript
@post("/user")
  async someFunction() {
    throw HttpErrorResponse.NOT_IMPLEMENTED("This method is not implemented!");
  }
```

> Similary for HttpResponse

```typescript
@post("/")
  async addUser(req: Request, res: Response, next: NextFunction) {
    return HttpResponse.CREATED({data : "new data entered"})
  }
```

## Parameter Decorators
> Pretty express provides 3 parameter decorators for our decorated functions

|decorators|details|
|-|-|
|`@reqBody`|returns request.body from the express request parameter|
|`@reqParam`|returns request.params from the express request parameter|
|`@reqQuery`|returns request.query from the express request parameter|
|`@reqFile`| returns request.file from the express request parameter|
|`@reqFiles`| returns request.files from the express request parameter|
|||

````typescript
  @post("/")
  async addUsers(@reqBody data: any , @reqParam params : any) {
    return  {data};
  }
````

> if no parameters are decorated the default arguments ``(Request, Response, NextFunction)`` from the express RouterHandler will be passed

````typescript
  @get("/")
  async getUsers(req: Request, res: Response, next: NextFunction) {
    return { message: "hello pretty express" };
  }
````

> Optionally You can also access the express routeHandler params as the final 3 arguments of the function in order.


````typescript
  @get("/")
  async getUsers(@reqBody data : any, req: Request, res: Response, next: NextFunction) {
    return { message: "hello pretty express" };
  }
````

# Writing your own Middleware Decorator

you can build your own custom middleware decorator instead of using `@middleware`, using the `createMiddlewareDecorator` method from `pretty-express`

```typescript
// import { createMiddlewareDecorator } from "pretty-express";
const jwtAuth = createMiddlewareDecorator<[role: string]>((args) => {
  return (req, res, next) => {
    console.log("ARGS , ", args);
    next();
  };
});
```
And use it in your controller/functions
``` typescript
  @jwtAuth("user")
  @get("/auth")
  getUsers(req: any) {
    console.log("Fetching users...");

    return { msg: "Hello world"};
  }
```

# Writing your own custom parameter decorator
You can also write your own parameter decorator to access the properties in a express request object.

``` typescript
// import { createParamDecorator } from "pretty-express";
const authData = createParamDecorator("authUser");
```
here authData is a decorator that will return `request.authData` (if present) in our decorated functions

``` typescript
 @get("/test")
  test(@authData authData: any, req: any) {
    console.log("AuthData : ", authData);

    return { msg: "Hello world", data: authData };
  }
```

You can use these two functions together to write your own middlewares using different libraries using this very simple format
``` typescript
const jwtAuth = createMiddlewareDecorator<[role: string]>((args) => {
  return (req : any, res, next) => {
    console.log("ARGS , ", args);
    req.authData = {email : "jugga@redoc.mh"}
    next();
  };
});

const authData = createParamDecorator("authData");

@controller("/")
export class SampleController {
  @jwtAuth("user")
  @get("/auth")
  getUsers(@authData authData: any, req: any) {
    console.log("REQ : ", req.authData);
    return { msg: "Hello world", data: authData };
  }
}
```


## Order of middleware execution

The order in which middlewares are executed is from Bottom to Top in which they are placed.

For example , Here the middleware will be called in order <br/>
middleware1  >> jwtAuth >> middleware2

``` typescript
  @middleware(middleware2)
  @jwtAuth("user")
  @middleware(middleware1)
  @get("/auth")
  getUsers(@authData authData: any, req: any) {
    console.log("REQ : ", req.authData);
    return { msg: "Hello world", data: authData };
  }
}
```


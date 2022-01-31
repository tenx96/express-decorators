
import "reflect-metadata";
import express, {Request,Response,NextFunction} from "express";
import { combineControllers, controller, get, middleware, post, errMiddleware} from "pretty-express";

// Controller class

const authMiddleware = (req : Request,res : Response,next : NextFunction) => {
  console.log("Authenticating...")
  next()
}

const errorMiddleware = (err: Error,req : Request,res : Response,next : NextFunction) => {
  console.log("Authenticating...")
  next()
}


const authMiddleware2 = (req : Request,res : Response,next : NextFunction) => {
  console.log("Authenticating...2")
  next()

}
@controller("/users")
export class UserController {

  @get("/")
  getUsers() {
    return { message: "Users data" };
  }
  @middleware(authMiddleware)
  @post("/new")
  createUser(){
    return {
      message : "Created new user;"
    }
  }

  @errMiddleware(errorMiddleware)
  @post("/delete")
  deleteUser(){
    return {
      message : "Deleted  user;"
    }
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

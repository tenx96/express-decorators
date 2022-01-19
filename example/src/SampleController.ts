import {get,post, controller} from "express-decorators";



@controller("/demo")
export class DemoController {
  
  @get("/")
  getTests() {
    return { message: "Hello get tests" };
  }
}

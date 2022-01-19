import {get,post, controller} from "pretty-express";



@controller("/demo")
export class DemoController {
  
  @get("/")
  getTests() {
    return { message: "Hello get tests" };
  }
}

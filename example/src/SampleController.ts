import {get,post, controller} from "../../pretty-express-reworked/dist/index";



@controller("/demo")
export class DemoController {
  
  @get("/")
  getTests() {
    return { message: "Hello get tests" };
  }
}

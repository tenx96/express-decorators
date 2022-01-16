import { controller, post, reqParam, reqQuery, reqBody } from "../../..";


@controller("/test")
export default class SampleController {
  @post("/1/:id")
  demo1(req : any,res : any,next : any) {
    const {body,params,query} = req;

    return {
      body,
      params,
      query,
    };
  }

  @post("/2/:id")
  demo2(@reqBody test: any, req : any,res : any,next : any) {
    const {body,params,query} = req;

    return {
      body,
      params,
      query,
    };
  }

  @post("/3/:id")
  demo3(@reqBody test: any, @reqQuery test2 : any, req : any,res : any,next : any) {
    const {body,params,query} = req;

    return {
      body,
      params,
      query,
    };
  }

  @post("/4/:id")
  demo4(@reqBody test: any, @reqQuery test2 : any, @reqParam test3 : any, req : any,res : any,next : any) {
    const {body,params,query} = req;

    return {
      body,
      params,
      query,
    };
  }

}

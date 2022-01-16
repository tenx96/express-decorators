import { controller, post, reqParam, reqQuery, reqBody } from "../../..";

@controller("/test")
export default class SampleController {
  @post("/body-param-query/:id")
  demo1(@reqBody body: any, @reqParam param: any, @reqQuery query: any) {
    return {
      body,
      param,
      query,
    };
  }

  @post("/body-query-param/:id")
  demo2( @reqBody body: any, @reqQuery query: any , @reqParam param: any,) {
    return {
        body,
        param,
        query,
      };
  }

  @post("/param-body-query/:id")
  demo3(@reqParam param: any,@reqBody body: any,  @reqQuery query: any) {
    return {
        body,
        param,
        query,
      };
  }

  @post("/param-query-body/:id")
  demo4( @reqParam param: any, @reqQuery query: any ,@reqBody body: any, ) {
    return {
        body,
        param,
        query,
      };
  }

  @post("/query-body-param/:id")
  demo5( @reqQuery query: any ,@reqBody body: any, @reqParam param: any,) {
    return {
        body,
        param,
        query,
      };
  }

  @post("/query-param-body/:id")
  demo6( @reqQuery query: any ,@reqParam param: any,@reqBody body: any,) {
    return {
        body,
        param,
        query,
      };
  }

  
}

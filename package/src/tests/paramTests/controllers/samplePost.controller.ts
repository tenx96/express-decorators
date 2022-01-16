import { controller,get,post,reqParam, reqQuery,reqBody } from "../../..";


@controller("/test")
export default class SampleController {


    @post("/param/:id")
    demo1(@reqParam params : any){
        return params;
    }

    @post("/query")
    demo2(@reqQuery query : any){
        return query;
    }

    @post("/body")
    demo3(@reqBody body : any){
        return body;
    }
}
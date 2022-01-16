import { controller,get,post,reqParam, reqQuery,reqBody } from "../../..";


@controller("/test")
export default class SampleController {


    @get("/param/:id")
    demo1(@reqParam params : any){
        return params;
    }

    @get("/query")
    demo2(@reqQuery query : any){
        return query;
    }

    @get("/body")
    demo3(@reqBody body : any){
        return body;
    }
}
import { controller,del,reqParam, reqQuery,reqBody } from "../../..";


@controller("/test")
export default class SampleController {


    @del("/param/:id")
    demo1(@reqParam params : any){
        return params;
    }

    @del("/query")
    demo2(@reqQuery query : any){
        return query;
    }

    @del("/body")
    demo3(@reqBody body : any){
        return body;
    }
}
import { controller,patch,reqParam, reqQuery,reqBody } from "../../..";


@controller("/test")
export default class SampleController {


    @patch("/param/:id")
    demo1(@reqParam params : any){
        return params;
    }

    @patch("/query")
    demo2(@reqQuery query : any){
        return query;
    }

    @patch("/body")
    demo3(@reqBody body : any){
        return body;
    }
}
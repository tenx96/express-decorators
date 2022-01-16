import { controller,del,get,reqParam, reqQuery,reqBody,middleware } from "../../..";
import {Request,Response,NextFunction} from "express"

const demoMiddleware = (req: Request,res : Response,next : NextFunction) => {
        req.body.data = {
            "value" : "m1"
        }

        next()
}

const classMiddleware = (req: Request,res : Response,next : NextFunction) => {
    req.body.data = {
        "value" : "m2",
        "classData" : "test"
    }

    next()
}



@controller("/test")
@middleware(classMiddleware)
export default class SampleController {

    @middleware(demoMiddleware)
    @get("/1")
    demo1(@reqBody body : any){
        return body;
    }


    @get("/2")
    demo2(@reqBody body : any){
        return body;
    }



}
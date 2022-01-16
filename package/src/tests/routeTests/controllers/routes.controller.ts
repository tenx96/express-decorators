
import {controller,get,post,patch,del} from "../../../"


@controller("/routes")
export default class SampleController {

    @get("/")
    homeGET(){
        return {message : "GET Welcome to home", method : "GET"}
    }

    @post("/")
    homePOST(){
        return {message : "Welcome to home" , method : "POST"}
    }

    @patch("/")
    homePATCH(){
        return {message : "Welcome to home" , method : "PATCH"}
    }

    @del("/")
    homeDEL(){
        return {message : "Welcome to home" , method : "DELETE"}
    }

}
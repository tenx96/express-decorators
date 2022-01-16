import { HttpResponse } from "../../../models/httpresponse";
import { controller, get, post, patch, del } from "../../../";
import { HttpErrorResponse } from "../../../models/httperror";

@controller("/error")
export default class SampleErrorController {
  @get("/1")
  g1() {
   throw new Error("1")
  }

  @get("/2")
  g2() {
   throw HttpErrorResponse.BAD_REQUEST("2")
  }

  @get("/3")
  g3() {
    throw HttpErrorResponse.BAD_GATEWAY("3", {"test" : "error"})
  }
}

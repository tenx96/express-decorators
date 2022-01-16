import { HttpResponse } from "../../../models/httpresponse";
import { controller, get, post, patch, del } from "../../../";

@controller("/return")
export default class SampleReturnedValueController {
  @get("/1")
  g1() {
    return { msg: "1" };
  }

  @get("/2")
  g2() {
    return HttpResponse.CREATED({ msg: "2" });
  }

  @get("/3")
  g3() {
    return HttpResponse.ACCEPTED({ msg: "3" });
  }

  @get("/4")
  g4() {
    return new HttpResponse(205, { msg: "4" });
  }
}

import {generateSampleApp, setDefaultErrorHandlers} from "../demoApp";
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/errorResponse.controller";
import request from "supertest";
import { expect } from "chai";
//

describe("Check if thrown errors are returnd with proper status codes", () => {
  let app = generateSampleApp();
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
    setDefaultErrorHandlers(app);
  });

  after(() => {
    app = undefined;
  });
  it("Check if default errors are not caught without handler, only HttpErrorResponse are supposed to be caught by error handler.", async () => {
    const response = await request(app)
      .get("/error/1")
      .expect(500);
  });

  it("HttpErrorResponse is returned with proper status code 400", async () => {
    const response = await request(app)
      .get("/error/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).to.have.keys("message", "error");
    expect(response.body.error).to.be.equal("2");
  });

  it("HttpErrorResponse is returned with proper status code 502 along with data", async () => {
    const response = await request(app)
      .get("/error/3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(502);

      expect(response.body).to.have.keys("message", "error", "data");
    expect(response.body.error).to.be.equal("3");
  });

 
  
});

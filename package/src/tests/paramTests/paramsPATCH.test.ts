import "reflect-metadata"
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/samplePatch.controller";
import request from "supertest";
import { expect } from "chai";

import {generateSampleApp} from "../demoApp"
//

describe("PATCH tests : Check if request params,body and query is recieved using @reqParams, @reqBody and @reqParams decorators for PATCH routes", () => {
  let app = generateSampleApp();
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });
  it("Check if route params is passed properly using param decorator , @reqParam", async () => {
    const response = await request(app)
      .patch("/test/param/randomId123")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("id");
    expect(response.body.id).to.be.equal("randomId123");
  });

  it("Check if route query is passed properly using param decorator , @reqQuery", async () => {
    const response = await request(app)
      .patch("/test/query?title=hello")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("title");
    expect(response.body.title).to.be.equal("hello");
  });

  it("Check if route body is passed properly using param decorator , @reqBody", async () => {
    const response = await request(app)
      .patch("/test/body")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        "field1" :"value1"
      })
      .expect(200);
    expect(response.body).to.have.keys("field1");
    expect(response.body.field1).to.be.equal("value1");
  });

  
  
});

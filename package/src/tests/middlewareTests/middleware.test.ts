import "reflect-metadata"
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controller/midd.controller";
import request from "supertest";
import { expect } from "chai";

import {generateSampleApp} from "../demoApp"
//

describe("@middleware tests", () => {
  let app = generateSampleApp();
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });
  it("func level middleware will add data {value : m1} to body. response will have body {data :{value : 1}}", async () => {
    const response = await request(app)
      .get("/test/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("data");
    expect(response.body.data).to.have.keys("value" );
    expect(response.body.data.value).to.be.equal("m1");
  });

  it("class level middleware will add data {value : m2} to body. response will have body {data :{value : m2}}", async () => {
    const response = await request(app)
      .get("/test/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("data");
    expect(response.body.data).to.have.keys("value" , "classData");
    expect(response.body.data.value).to.be.equal("m2");
    expect(response.body.data.classData).to.be.equal("test");
  });

 
  
  
});

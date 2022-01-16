import "reflect-metadata";
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/sampleOrderDetault.controller";
import request from "supertest";
import { expect } from "chai";

import { generateSampleApp } from "../demoApp";
//

describe("Check if the last 3 functions of a decorated function is always req,res,next from express request handlers", () => {
  let app = generateSampleApp();
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });
  it("No param Decorator, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/1/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "params", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.params.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("1 param Decorator, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/2/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "params", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.params.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("2 param Decorator, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/3/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "params", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.params.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("3 param Decorator, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/4/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "params", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.params.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

 
});

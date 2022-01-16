import "reflect-metadata";
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/sampleOrder.controller";
import request from "supertest";
import { expect } from "chai";

import { generateSampleApp } from "../demoApp";
//

describe("Check if params marked with @reqParams, @reqQuery, @reqBody are in proper order", () => {
  let app = generateSampleApp();
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });
  it("body-param-query order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/body-param-query/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("body-query-param order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/body-query-param/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("param-body-query order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/param-body-query/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("param-query-body order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/param-query-body/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("query-body-param order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/query-body-param/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });

  it("query-param-body order, all data should return back what was sent", async () => {
    const response = await request(app)
      .post("/test/query-param-body/123?queryKey=234")//123 is the param :id ===> {id : 123}
      .set("Accept", "application/json")
      .send({
        body1: "value1",
      }) 
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("body", "param", "query");
    expect(response.body.body.body1).to.be.equal("value1");
    expect(response.body.param.id).to.be.equal("123");
    expect(response.body.query.queryKey).to.be.equal("234");
  });
});

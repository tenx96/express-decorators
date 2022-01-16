import demoApp from "../demoApp";
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/returnedValue.controller";
import request from "supertest";
import { expect } from "chai";
//

describe("Check if returned values are returnd with proper status codes", () => {
  let app = demoApp;
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });
  it("Check if returnd value from controller function is returned with 200 response", async () => {
    const response = await request(app)
      .get("/return/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("msg");
    expect(response.body.msg).to.be.equal("1");
  });

  it("Check if returnd value from controller function is returned with 201 response", async () => {
    const response = await request(app)
      .get("/return/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).to.have.keys("msg");
    expect(response.body.msg).to.be.equal("2");
  });

  it("Check if returnd value from controller function is returned with 202 response", async () => {
    const response = await request(app)
      .get("/return/3")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(202);

    expect(response.body).to.have.keys("msg");
    expect(response.body.msg).to.be.equal("3");
  });

  it("Check if returnd value from controller function is returned with 205 response", async () => {
    const response = await request(app)
      .get("/return/4")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(205);

    expect(response.body).to.have.keys("msg");
    expect(response.body.msg).to.be.equal("4");
  });
  
});

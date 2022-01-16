import demoApp from "../demoApp";
import { combineControllers } from "../../generators/controller.generator";
import SampleController from "./controllers/routes.controller";
import request from "supertest";
import { expect } from "chai";
//

describe("Check if given HTTP Methods are being rendered properly", () => {
  let app = demoApp;
  before(() => {
    const router = combineControllers([new SampleController()]);
    app.use(router);
  });

  after(() => {
    app = undefined;
  });

  it("Check GET methods", async () => {
    const response = await request(app)
      .get("/routes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("method", "message");
    expect(response.body.method).to.be.equal("GET");
  });

  it("Check POST methods", async () => {
    const response = await request(app)
      .post("/routes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("method", "message");
    expect(response.body.method).to.be.equal("POST");
  });

  it("Check PATCH methods", async () => {
    const response = await request(app)
      .patch("/routes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("method", "message");
    expect(response.body.method).to.be.equal("PATCH");
  });

  it("Check DELETE methods", async () => {
    const response = await request(app)
      .del("/routes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.have.keys("method", "message");
    expect(response.body.method).to.be.equal("DELETE");
  });
});

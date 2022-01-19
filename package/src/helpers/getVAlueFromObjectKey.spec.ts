import { expect } from "chai";
import { getValueFromObjectKey } from "./getValueFromObjectKey";
describe("Helper method test , getValueFromObjectKey", () => {
  it("Should return proper value for given Object and key . Key is single string wihtout dots", () => {
    const sampleObject = {
      body: {
        message: "Hello",
      },
    };

    const value = getValueFromObjectKey(sampleObject, "body");
    expect(value).to.have.keys("message");
    expect(value.message).to.be.equal("Hello");
  });

  it("Should return proper value for given Object and key . Key is single string with 1 dot", () => {
    const sampleObject = {
      body: {
        message: "Hello",
      },
    };

    const value = getValueFromObjectKey(sampleObject, "body.message");
    expect(value).to.be.equal("Hello");
  });

  it("Should return proper value for given Object and key . Key is single string with 1 dot", () => {
    const sampleObject = {
      body: {
        message: "Hello",
        deep: {
          data: {
            message: "Deep Message",
          },
        },
      },
    };

    const value = getValueFromObjectKey(sampleObject, "body.deep");
    expect(value).to.have.keys("data");
    expect(value.data).to.have.keys("message");
    expect(value.data.message).to.be.equal("Deep Message");
  });

  it("Should return default source with empty key", () => {
    const sampleObject = {
      body: {
        message: "Hello",
        deep: {
          data: {
            message: "Deep Message",
          },
        },
      },
    };
    const value = getValueFromObjectKey(sampleObject, "");
    expect(value).to.be.equal(value);


  });
});

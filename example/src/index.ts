import "reflect-metadata"
import express from "express";
import { combineControllers, } from "express-decorators";
import { DemoController } from "./SampleController";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const router = combineControllers([new DemoController()])
app.use(router)

app.listen(7000, () => {
    console.log("Listening on http://localhost:7000")
})

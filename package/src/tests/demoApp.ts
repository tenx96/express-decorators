import "reflect-metadata";
import express from "express";

export const generateSampleApp = () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  return app;
};

export const setDefaultErrorHandlers = (app : express.Express) => {
    app.use((req : express.Request,res : express.Response,next : express.NextFunction) => {
        // default 404 handler
        return res.status(404).json({})
      })
    
      app.use((err : Error,req : express.Request,res : express.Response,next : express.NextFunction) => {
        // default error handler
        return res.status(500).json({})
      })
}


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;

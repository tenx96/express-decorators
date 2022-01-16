import {Request,Response,NextFunction} from "express"

export type IMiddleware = (req : Request, res : Response , next : NextFunction) => any
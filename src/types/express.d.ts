import { ITokenPayload } from "../interfaces/token-payload.interface";

declare global {
    namespace Express {
        interface Request {
            user?: ITokenPayload; 
        }
    }
}

export {};
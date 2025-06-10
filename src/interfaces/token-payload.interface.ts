import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload {
    username: string;
    accountId: string;
    role: string;
}


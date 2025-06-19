import { JwtPayload } from "jsonwebtoken";

export interface ITokenPayload extends JwtPayload {
    accountId: string;
    username: string;
    email: string;
    role: string;
}


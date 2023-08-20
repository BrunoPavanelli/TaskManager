
import { injectable } from "tsyringe";
import { TToken, TTokenObject } from "../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";

@injectable()
class UsersLoginService {
    constructor() {}

    userLogin(data: TToken): TTokenObject {
        const token = sign(
            {},
            String(process.env.SECRET_KEY),
            { expiresIn: "1d", subject: String(data.id) }
        );

        const tokenObject: TTokenObject = {
            token: token
        };

        return tokenObject;
    }

}
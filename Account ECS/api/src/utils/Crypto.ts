
import * as crypto from "crypto";

export const generateSecureKey = () => {

    return crypto.randomBytes(32).toString('hex');

}
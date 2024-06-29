import jwt, { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";
import { log } from "./log";

export const signJwt = (
  payload: string | object | Buffer,
  secretOrPrivateKey: Secret,
  options: SignOptions
) => {
  return jwt.sign(payload, secretOrPrivateKey, options);
};

export const verifyJwt = (
  token: string,
  secretOrPublicKey: Secret,
  options: VerifyOptions
) => {
  return jwt.verify(token, secretOrPublicKey, options);
};

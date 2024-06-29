//Elysia Model

import { Elysia, t } from "elysia";
import { getElysiaResult } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";

//Objects

const SendOtp = t.Object({
  phone: t.String({ pattern: "^[0-9]{10}$", default: "9664351136" }),
});

const VerifyOtp = t.Object({
  phone: t.String({ pattern: "^[0-9]{10}$", default: "9664351136" }),
  otp: t.String({ maxLength: 6, minLength: 6 }),
});

const ChangePassword = t.Object({
  oldPassword: t.String(),
  newPassword: t.String(),
});

const BuyerResponseData = t.Object({
  id: t.String(),
  email: t.String({ format: "email" }),
  name: t.String(),
  password: t.String(),
  role: t.Enum({
    USER: "USER",
    ADMIN: "ADMIN",
  }),
  posts: t.Array(t.Any()),
  createdAt: t.String({ format: "date-time" }),
  updatedAt: t.String({ format: "date-time" }),
});

//types

export type ISignIn = (typeof SendOtp)["static"];
export type IChangePassword = (typeof ChangePassword)["static"];

//models
export const BuyerModel = new Elysia().model({
  buyerSendOtp: SendOtp,
  changePassword: ChangePassword,
  buyerResponse: getElysiaResult(BuyerResponseData, HttpStatusCode.OK, true),
  buyerVerifyOtp: VerifyOtp
});

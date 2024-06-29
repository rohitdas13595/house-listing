//Elysia Model

import { Elysia, t } from "elysia";
import { getElysiaResult } from "@/backend/core/result";
import { HttpStatusCode } from "../../core/statusCodes";

const AdminResponseData = t.Object({
  id: t.String(),
  email: t.String({ format: "email" }),
  createdAt: t.String({ format: "date-time" }),
  updatedAt: t.String({ format: "date-time" }),
});

const adminSignIn = t.Object({
  email: t.String({ format: "email", default: "rohit@gmail.com" }),
  password: t.String({default: "rohit"}),
});

const adminCreate = t.Object({
  email: t.String({ format: "email", default: "rohit@gmail.com" }),
  password: t.String({default: "rohit"}),
  adminRoleId: t.String(),
});

const adminUpdate = t.Partial(
  t.Object({
    // email: t.String({ format: "email" }),
    password: t.String(),
    adminRoleId: t.String(),
  })
);



//models
export const AdminModel = new Elysia().model({
  adminResponse: getElysiaResult(AdminResponseData, HttpStatusCode.OK, true),
  adminSignIn: adminSignIn,
  adminCreate: adminCreate,
  adminUpdate: adminUpdate,
});

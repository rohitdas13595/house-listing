import { HouseListing } from "@prisma/client";
import { Elysia, t } from "elysia";
import { getElysiaResult } from "../../core/result";

const HouseType = t.Object({
  id: t.String({ format: "uuid" }),
  title: t.String(),
  // phone: t.String(),
  createdAt: t.String({ format: "date-time" }),
  updatedAt: t.String({ format: "date-time" }),
});

export const HouseModel = new Elysia().model({
  houseResponse: getElysiaResult(HouseType),
});

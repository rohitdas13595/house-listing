import { Seller } from "@prisma/client";
import  {Elysia, t} from "elysia";
import { getElysiaResult } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";


const  SellerType  =  t.Object({
    id: t.String({format: "uuid"}),
    email: t.String({format: "email"}),
    // phone: t.String(),
    createdAt: t.String({format: "date-time"}),
    updatedAt: t.String({format: "date-time"}),
})

const SendOtp = t.Object({
    phone: t.String({ pattern: "^[0-9]{10}$", default: "9664351136" }),
  });
  
  const VerifyOtp = t.Object({
    phone: t.String({ pattern: "^[0-9]{10}$", default: "9664351136" }),
    otp: t.String({ maxLength: 6, minLength: 6 }),
  });

export  const  SellerModel  =  new  Elysia().model({
    sellerResponse:  getElysiaResult(SellerType,  HttpStatusCode.OK,  true),
    sellerSendOtp  :  SendOtp,
    sellerVerifyOtp  :  VerifyOtp,

});
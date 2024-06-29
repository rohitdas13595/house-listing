import { Elysia, t } from "elysia";

import { SellerModel } from "./ISeller";
import { SellerService } from "./seller.service";
import { Result } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";
import { Seller } from "@prisma/client";
import { Settings } from "../../core/settings";
import { extractId } from "../../utils/extractId";
import { log } from "../../core/log";

export function sellerController(app: Elysia, service: SellerService) {
  return app.group("/seller", (app) => {
    return (
      app
        .use(SellerModel)
        .derive(async ({ cookie }) => {
          const ids = await extractId(cookie);

          log.info({
            message: "extracted ids",
            ids,
          });

          return {
            buyerId: ids.buyerId,
            sellerId: ids.sellerId,
          };
        })

        //Seller get
        .get(
          "",
          async ({ query }) => {
            console.log("query", query);
            return await service.getMany(query);
          },
          {
            detail: {
              tags: ["Seller"],
            },
            beforeHandle() {},
          }
        )
        .get(
          "/:id",
          async ({ params: { id } }) => {
            const result = await service.getOne(id);
            return result;
          },
          {
            detail: {
              tags: ["Seller"],
            },
            params: t.Object({
              id: t.String(),
            }),
          }
        )
        .put(
          "/:id",
          async ({ params: { id }, body }) => {
            if (!body) {
              return new Result(
                true,
                HttpStatusCode.BAD_REQUEST,
                "missing body"
              );
            }

            const reqBody = body as Partial<Seller>;

            if (reqBody?.id) {
              delete reqBody.id;
            }
            const result = await service.updateOne(id, reqBody);
            return result;
          },
          {
            detail: {
              tags: ["Seller"],
            },
          }
        )
        .post(
          "/sendOtp",
          async ({ set, body: { phone } }) => {
            const result = await service.sendOtp(phone);

            set.status =
              result.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Seller"],
            },
            body: "sellerSendOtp",
          }
        )
        .post(
          "/verifyOtp",
          async ({ set, body: { phone, otp }, setCookie }: any) => {
            const result = await service.verifyOtp(phone, otp, setCookie);
            set.status =
              result.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Seller"],
            },
            body: "sellerVerifyOtp",
          }
        )
        .get("exchangeToken", async ({ set, cookie }: any) => {
          return new Result(
            true,
            HttpStatusCode.NOT_IMPLEMENTED,
            "No  Implemented  yet"
          );
        })
        .get(
          "/listedHouses",
          async ({ set, cookie, query, sellerId }: any) => {
            if (!sellerId) {
              return new Result(
                true,
                HttpStatusCode.PARTIAL_CONTENT,
                "No  sellerId  found",
                undefined
              );
            }
            query["listedBySellerId"] = sellerId;
            log.info({
              message: "getListedHouses query",
              query,
            })
            const result = await service.getListedHouses(query);
            set.status =
              result.status.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Seller"],
            },
          }
        )
    );
  });
}

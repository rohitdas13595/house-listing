import { Elysia, t } from "elysia";

import { BuyerModel } from "./IBuyer";
import { BuyerService } from "./buyer.service";
import { HttpStatusCode } from "../../core/statusCodes";
import { SetType } from "../../utils/types";
import { log } from "../../core/log";
import { extractId } from "../../utils/extractId";
import { Result } from "../../core/result";

export function buyerController(app: Elysia, service: BuyerService) {
  return app.group("/buyer", (app) => {
    return (
      app
        .use(BuyerModel)
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

        //Buyer get
        .get(
          "",
          async ({ query }) => {
            console.log("query", query);
            return await service.getMany(query);
          },
          {
            detail: {
              tags: ["Buyer"],
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
              tags: ["Buyer"],
            },
            params: t.Object({
              id: t.String(),
            }),
          }
        )
        .put("/:id", () => {}, {
          detail: {
            tags: ["Buyer"],
          },
        })
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
              tags: ["Buyer"],
            },
            body: "buyerSendOtp",
          }
        )
        .post(
          "/verifyOtp",
          async ({ set, body: { phone, otp } }) => {
            const result = await service.verifyOtp(phone, otp, set as SetType);
            set.status =
              result.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Buyer"],
            },
            body: "buyerVerifyOtp",
          }
        )
        .get(
          "/getHousesSeen",
          async ({ set, buyerId, query }) => {
            if (!buyerId) {
              set.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
              return new Result(
                true,
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                "missing buyerId"
              );
            }
            query["buyerId"] = buyerId;
            const result = await service.getHousesSeenByBuyer(query);
            set.status =
              result.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Buyer"],
            },
          }
        )
        .get(
          "getHouseWishlist",
          async ({ set, buyerId, query }) => {
            if (!buyerId) {
              set.status = HttpStatusCode.UNPROCESSABLE_ENTITY;
              return new Result(
                true,
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                "missing buyerId"
              );
            }
            query["buyerId"] = buyerId;
            const result = await service.getHousesWishlistedByBuyer(query);
            set.status =
              result.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
              
            return result;


          },
          {
            detail: {
              tags: ["Buyer"],
            },
          }
        )
    );
  });
}

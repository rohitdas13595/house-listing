import { Elysia, t } from "elysia";

import { AdminModel } from "./IAdmin";
import { AdminService } from "./admin.service";
import { log } from "../../core/log";
import { Result, getElysiaResult } from "@/backend/core/result";
import { HttpStatusCode } from "../../core/statusCodes";
import { adminAuthMiddleware } from "../../auth/adminMiddleware";
import { Admin } from "@/backend/db/schema";
import { NextResponse } from "next/server";

export function adminController(app: Elysia, service: AdminService) {
  return app.group("/admin", (app) => {
    return (
      app
        .use(AdminModel)

        //Admin get
        .get(
          "",
          async ({ query, set, cookie }) => {
            // console.log("query", query);
            const result = await service.getMany(query);
            set.status =
              result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            console.log("result", typeof result);
            return NextResponse.json(result, {
              status:
                result?.status?.code || HttpStatusCode.INTERNAL_SERVER_ERROR,
            });
          },
          {
            detail: {
              tags: ["Admin"],
            },
            afterHandle({ set, body, headers }) {
              console.log("headers", headers);
            },
            // beforeHandle({ cookie, set }) {
            //   const result = adminAuthMiddleware(cookie);
            //   // return set.status = HttpStatusCode.UNAUTHORIZED;
            //   if (result) {
            //     set.status =
            //       result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            //     return result;
            //   }
            // },
          }
        )
        .post("",
          async ({ body, set }) => {
            const result = await service.create(body);
            set.status =
              result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Admin"],
            },
            body: "adminCreate",
            // beforeHandle({ cookie, set }) {
            //   const result = adminAuthMiddleware(cookie);
            //   // return set.status = HttpStatusCode.UNAUTHORIZED;
            //   if (result) {
            //     set.status =
            //       result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            //     return result;
            //   }
            // },
            response: {
              200: "adminResponse",
              400: getElysiaResult({}, HttpStatusCode.BAD_REQUEST, false),
              500: getElysiaResult(
                {},
                HttpStatusCode.INTERNAL_SERVER_ERROR,
                false
              ),
            },
          }
        )
        .get(
          "/:id",
          async ({ params: { id }, set }) => {
            const result = await service.getOne(id);
            set.status =
              result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return result;
          },
          {
            detail: {
              tags: ["Admin"],
            },
            params: t.Object({
              id: t.String(),
            }),
            beforeHandle({ cookie, set }) {
              const result = adminAuthMiddleware(cookie);
              // return set.status = HttpStatusCode.UNAUTHORIZED;
              if (result) {
                set.status =
                  result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
                return NextResponse.json(result, {
                  status:
                    result?.status?.code ||
                    HttpStatusCode.INTERNAL_SERVER_ERROR,
                });
              }
            },
          }
        )
        .put(
          "/:id",
          async ({ params: { id }, body, set }) => {
            const result = await service.updateOne(
              id,
              body as Partial<typeof Admin.$inferSelect>
            );
            set.status =
              result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;

            return NextResponse.json(result);
          },
          {
            detail: {
              tags: ["Admin"],
            },
            params: t.Object({
              id: t.String(),
            }),
            body: "adminUpdate",
            beforeHandle({ cookie, set }) {
              const result = adminAuthMiddleware(cookie);
              // return set.status = HttpStatusCode.UNAUTHORIZED;
              if (result) {
                set.status =
                  result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
                return NextResponse.json(result, {
                  status:
                    result?.status?.code ||
                    HttpStatusCode.INTERNAL_SERVER_ERROR,
                });
              }
            },
          }
        )
        .post(
          "/signIn",
          async ({ body, set }: any) => {
            if (!set) {
              return NextResponse.json(
                new Result(
                  false,
                  HttpStatusCode.UNAUTHORIZED,
                  "Missing cookie"
                ),
                { status: HttpStatusCode.UNAUTHORIZED }
              );
            }

            console.log("cookie", set.cookie);
            const result = await service.signIn(body.email, body.password, set);

            set.status = result?.status.code;

            return NextResponse.json(result);
          },

          {
            detail: {
              tags: ["Admin"],
            },
            body: "adminSignIn",
          }
        )
        .get(
          "/signOut",
          async ({ setCookie, set }: any) => {
            setCookie("rezidenzz__1", "", {
              path: "/",
              maxAge: 0,
            });

            setCookie("rezidenzz__2", "", {
              path: "/",
              maxAge: 0,
            });

            set.status = 200;
            return NextResponse.json(
              new Result(false, HttpStatusCode.OK, "logged out"),
              { status: HttpStatusCode.OK }
            );
          },
          {
            detail: {
              tags: ["Admin"],
            },
          }
        )
        .get(
          "/exchangeToken",
          async ({ setCookie, set, cookie }: any) => {
            const result = await service.exchangeToken(cookie, setCookie);
            set.status =
              result?.status?.code ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
            return NextResponse.json(result, {
              status:
                result?.status?.code || HttpStatusCode.INTERNAL_SERVER_ERROR,
            });
          },
          {
            detail: {
              tags: ["Admin"],
            },
          }
        )
    );
  });
}

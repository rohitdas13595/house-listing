import { Elysia, t } from "elysia";

import { HouseService } from "./house.service";
import { HouseModel } from "./IHouse";


export function houseController(app: Elysia, service: HouseService) {
  return app.group("/house", (app) => {
    return (
      app
        .use(HouseModel)

        //House get
        .get(
          "",
          async ({ query }) => {
            console.log("query", query);
            return await service.getMany(query);
          },
          {
            detail: {
              tags: ["House"],
            },
            beforeHandle(){
                
            }
          }
        )
        .get(
          "/:id",
          async ({ params: { id } }) => {
            const user = await service.getOne(id);
            return user;
          },
          {
            detail: {
              tags: ["House"],
            },
            params: t.Object({
              id: t.String(),
            }),
          }
        )
        .put("/:id", ({set,store,query }) => {
          
        }, {
          detail: {
            tags: ["House"],
          },
        })
    );
  });
}

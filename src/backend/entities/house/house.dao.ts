import { HouseListing } from "@prisma/client";
import { DaoClass } from "../../core/dao";



export class HouseDao extends DaoClass<HouseListing> {
  constructor(client: any) {
    super(client);
  }
}

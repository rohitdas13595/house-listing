import { HouseSeen } from "@prisma/client";
import { DaoClass } from "../../../core/dao"; 



export class HouseSeenDao extends DaoClass<HouseSeen> {
  constructor(client: any) {
    super(client);
  }
}

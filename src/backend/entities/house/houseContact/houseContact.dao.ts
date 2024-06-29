import { HouseContact } from "@prisma/client";
import { DaoClass } from "../../../core/dao"; 



export class HouseContactDao extends DaoClass<HouseContact> {
  constructor(client: any) {
    super(client);
  }
}

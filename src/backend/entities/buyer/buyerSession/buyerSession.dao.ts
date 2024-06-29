import { BuyerSession } from "@prisma/client";
import { DaoClass } from "../../../core/dao"; 



export class BuyerSessionDao extends DaoClass<BuyerSession> {
  constructor(client: any) {
    super(client);
  }
}

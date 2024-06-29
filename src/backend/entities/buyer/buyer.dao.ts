import { Buyer } from "@prisma/client";
import { DaoClass } from "../../core/dao";

export class BuyerDao extends DaoClass<Buyer> {
  constructor(client: any) {
    super(client);
  }
}

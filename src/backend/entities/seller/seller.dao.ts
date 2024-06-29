import { Seller } from "@prisma/client";
import { DaoClass } from "../../core/dao";



export class SellerDao extends DaoClass<Seller> {
  constructor(client: any) {
    super(client);
  }
}

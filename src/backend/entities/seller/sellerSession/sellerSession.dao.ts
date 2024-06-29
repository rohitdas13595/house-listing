import { SellerSession } from "@prisma/client";
import { DaoClass } from "../../../core/dao"; 



export class SellerSessionDao extends DaoClass<SellerSession> {
  constructor(client: any) {
    super(client);
  }
}

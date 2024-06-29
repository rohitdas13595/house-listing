import { SellerSession } from "@prisma/client";
import { Service } from "../../../core/service";
import { SellerSessionDao } from "./sellerSession.dao";


export class SellerSessionService extends Service<SellerSession> {
    dao:  SellerSessionDao
  constructor(dao: SellerSessionDao) {
    super(dao);
    this.dao =  dao
  }

}

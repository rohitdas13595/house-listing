import { BuyerSession } from "@prisma/client";
import { Service } from "../../../core/service";
import { BuyerSessionDao } from "./buyerSession.dao";


export class BuyerSessionService extends Service<BuyerSession> {
    dao:  BuyerSessionDao
  constructor(dao: BuyerSessionDao) {
    super(dao);
    this.dao =  dao
  }

}

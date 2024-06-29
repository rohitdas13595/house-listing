import { HouseContact } from "@prisma/client";
import { Service } from "../../../core/service";
import { HouseContactDao } from "./houseContact.dao"; 


export class HouseContactService extends Service<HouseContact> {
  dao: HouseContactDao;
  constructor(dao: HouseContactDao) {
    super(dao);
    this.dao = dao;
  }
}

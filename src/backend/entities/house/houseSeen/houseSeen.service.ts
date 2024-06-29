import { HouseSeen } from "@prisma/client";
import { Service } from "../../../core/service";
import { HouseSeenDao } from "./houseSeen.doa";


export class HouseSeenService extends Service<HouseSeen> {
  dao: HouseSeenDao;
  constructor(dao: HouseSeenDao) {
    super(dao);
    this.dao = dao;
  }
}

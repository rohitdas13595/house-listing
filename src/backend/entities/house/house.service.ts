import { HouseListing } from "@prisma/client";
import { Service } from "../../core/service";
import { HouseDao } from "./house.dao";

export class HouseService extends Service<HouseListing> {
  dao: HouseDao;
  constructor(dao: HouseDao) {
    super(dao);
    this.dao = dao;
  }
}

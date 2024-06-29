import { HouseWishlist } from "@prisma/client";
import { Service } from "../../../core/service";
import { HouseWishlistDao } from "./houseWishlist.dao"; 

export class HouseWishlistService extends Service<HouseWishlist> {
  dao: HouseWishlistDao;
  constructor(dao: HouseWishlistDao) {
    super(dao);
    this.dao = dao;
  }
}

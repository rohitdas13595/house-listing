import { HouseWishlist } from "@prisma/client";
import { DaoClass } from "../../../core/dao"; 



export class HouseWishlistDao extends DaoClass<HouseWishlist> {
  constructor(client: any) {
    super(client);
  }
}

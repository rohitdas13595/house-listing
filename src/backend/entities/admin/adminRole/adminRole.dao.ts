import { AdminRole } from "@/backend/db/schema";
import { DaoClass } from "../../../core/dao"; 



export class AdminRoleDao extends DaoClass<typeof AdminRole.$inferSelect> {
  constructor(client: any) {
    super(client);
  }
}

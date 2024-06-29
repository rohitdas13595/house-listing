import { AdminRole } from "@/backend/db/schema";
import { Service } from "../../../core/service";
import { AdminRoleDao } from "./adminRole.dao";


export class AdminRoleService extends Service<typeof  AdminRole.$inferSelect> {
    dao:  AdminRoleDao
  constructor(dao: AdminRoleDao) {
    super(dao);
    this.dao =  dao
  }

}

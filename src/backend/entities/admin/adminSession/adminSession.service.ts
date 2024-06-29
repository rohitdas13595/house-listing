import { AdminSession } from "@/backend/db/schema";
import { Service } from "../../../core/service";
import { AdminSessionDao } from "./adminSession.dao";


export class AdminSessionService extends Service<typeof AdminSession.$inferSelect> {
    dao:  AdminSessionDao
  constructor(dao: AdminSessionDao) {
    super(dao);
    this.dao =  dao
  }

}

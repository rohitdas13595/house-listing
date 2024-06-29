import { AdminSession } from "@/backend/db/schema";
import { DaoClass } from "../../../core/dao"; 



export class AdminSessionDao extends DaoClass<typeof AdminSession.$inferSelect> {
  constructor(client: any) {
    super(client);
  }
}

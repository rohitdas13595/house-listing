import { Admin, DbTables } from "@/backend/db/schema";
import { DaoClass } from "../../core/dao";

export class AdminDao extends DaoClass<typeof Admin.$inferSelect> {
  constructor(entity: DbTables) {
    super(entity);
  }
}

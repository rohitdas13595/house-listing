import { DaoClass } from "../../../core/dao";
import { AdminKey } from "@/backend/db/schema";

export class AdminKeyDao extends DaoClass<typeof AdminKey.$inferSelect> {
  constructor(client: any) {
    super(client);
  }
}

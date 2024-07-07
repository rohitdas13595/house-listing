import { Service } from "../../../core/service";
import { AdminKeyDao } from "./adminKey.dao";
import { AdminKey } from "@/backend/db/schema";

export class AdminKeyService extends Service<typeof AdminKey.$inferSelect> {
  dao: AdminKeyDao;
  constructor(dao: AdminKeyDao) {
    super(dao);
    this.dao = dao;
  }
}

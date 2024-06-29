import { AdminKey } from "@prisma/client";
import { Service } from "../../../core/service";
import { AdminKeyDao } from "./adminKey.dao";

export class AdminKeyService extends Service<AdminKey> {
  dao: AdminKeyDao;
  constructor(dao: AdminKeyDao) {
    super(dao);
    this.dao = dao;
  }
}

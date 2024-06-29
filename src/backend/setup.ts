import { Admin, AdminKey, AdminSession, DbTables, AdminRole } from "./db/schema";
import { AdminDao } from "./entities/admin/admin.dao";
import { AdminService } from "./entities/admin/admin.service";
import { AdminKeyDao } from "./entities/admin/adminKey/adminKey.dao";
import { AdminKeyService } from "./entities/admin/adminKey/adminKey.service";
import { AdminRoleDao } from "./entities/admin/adminRole/adminRole.dao";
import { AdminRoleService } from "./entities/admin/adminRole/adminRole.service";
import { AdminSessionDao } from "./entities/admin/adminSession/adminSession.dao";
import { AdminSessionService } from "./entities/admin/adminSession/adminSession.service";

export const adminSessionDao = new AdminSessionDao(AdminSession as any);
export const adminSessionService = new AdminSessionService(adminSessionDao);

export const adminKeyDao = new AdminKeyDao(AdminKey as any);
export const adminKeyService = new AdminKeyService(adminKeyDao);

export const adminRoleDao = new AdminRoleDao(AdminRole as any);
export const adminRoleService = new AdminRoleService(adminRoleDao);

export const adminDao = new AdminDao(Admin as any);
export const adminService = new AdminService(
  adminDao,
  adminSessionService,
  adminRoleService,
  adminKeyService
);


















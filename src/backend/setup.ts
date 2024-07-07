import { Admin, AdminKey, AdminSession, DbTables, AdminRole, BuyerSession, Buyer} from "./db/schema";
import { AdminDao } from "./entities/admin/admin.dao";
import { AdminService } from "./entities/admin/admin.service";
import { AdminKeyDao } from "./entities/admin/adminKey/adminKey.dao";
import { AdminKeyService } from "./entities/admin/adminKey/adminKey.service";
import { AdminRoleDao } from "./entities/admin/adminRole/adminRole.dao";
import { AdminRoleService } from "./entities/admin/adminRole/adminRole.service";
import { AdminSessionDao } from "./entities/admin/adminSession/adminSession.dao";
import { AdminSessionService } from "./entities/admin/adminSession/adminSession.service";
// import { BuyerDao } from "../../buyer/buyer.dao";
// import { BuyerService } from "../../buyer/buyer.service";
// import { BuyerSessionDao } from "../../buyer/buyerSession/buyerSession.dao";
// import { BuyerSessionService } from "../../buyer/buyerSession/buyerSession.service";

export const adminSessionDao = new AdminSessionDao(AdminSession as any);
export const adminKeyDao = new AdminKeyDao(AdminKey as any);
export const adminRoleDao = new AdminRoleDao(AdminRole as any);
export const adminDao = new AdminDao(Admin as any);
// export  const  buyerSessionDao  =  new BuyerSessionDao( BuyerSession );
// export const buyerDao = new BuyerDao(Buyer);

export const adminSessionService = new AdminSessionService(adminSessionDao);
export const adminKeyService = new AdminKeyService(adminKeyDao);
export const adminRoleService = new AdminRoleService(adminRoleDao);
export const adminService = new AdminService(
  adminDao,
  adminSessionService,
  adminRoleService,
  adminKeyService
);
// export const  buyerSessionService  =  new BuyerSessionService( buyerSessionDao );
// export const  buyerService  =  new BuyerService( buyerDao);






















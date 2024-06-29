import { Service } from "../../core/service";
import { AdminDao } from "./admin.dao";
import { Result } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";
import { log } from "../../core/log";
import { signJwt, verifyJwt } from "../../core/jwt";
import { AdminSessionService } from "./adminSession/adminSession.service";
import { AdminRoleService } from "./adminRole/adminRole.service";
import { AdminKeyService } from "./adminKey/adminKey.service";
import { Settings } from "../../core/settings";
import {Admin} from  '../../db/schema'
import { db } from "@/backend/db/connection";
import { eq } from "drizzle-orm";
import { comparePassword, hashPassword } from "@/backend/core/hash";

export class AdminService extends Service<typeof Admin.$inferSelect> {
  dao: AdminDao;
  adminRoleService: AdminRoleService;
  adminSessionService: AdminSessionService;
  adminKeyService: AdminKeyService;
  constructor(
    dao: AdminDao,
    adminSessionService: AdminSessionService,
    adminRoleService: AdminRoleService,
    adminKeyService: AdminKeyService
  ) {
    super(dao);
    this.dao = dao;
    this.adminRoleService = adminRoleService;
    this.adminSessionService = adminSessionService;
    this.adminKeyService = adminKeyService;
  }

  public async create(body: Partial<typeof Admin.$inferInsert>) {
    if (!body) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "missing body",
        undefined
      );
    }
    if (!body.email) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "missing email",
        undefined
      );
    }
    if (!body.password) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "missing password",
        undefined
      );
    }

    if (!body.adminRoleId) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "missing adminRoleId",
        undefined
      );
    }
    const role = await this.adminRoleService.getOne(body.adminRoleId);
    console.log("role", role);
    if (!role?.result?.id) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "admin role not found",
        undefined
      );
    }

    const findAdmin = await db.select().from(Admin).where(eq(Admin.email, body.email))
    if (findAdmin[0]) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "email already exists",
        undefined
      );
    }

    const hashedPassword = await  hashPassword(body.password);
    if (!hashedPassword) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "error hashing password",
        undefined
      );
    }
    body.password = hashedPassword;

    const result = await this.dao.create(body);
    await this.adminKeyService.create({
      adminId: result?.result?.id,
      hashedPassword: hashedPassword,
    })

    if (!result?.result?.id) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "error creating admin",
        undefined
      );
    }

    const adminKeyCreate = await this.adminKeyService.create({
      adminId: result?.result?.id,
      hashedPassword: hashedPassword,
    });

    if (!adminKeyCreate?.result?.id) {
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        "error creating adminKey",
        undefined
      );
    }

    return new Result(false, HttpStatusCode.OK, "admin created successfully", {
      id: result?.result?.id,
      email: result?.result?.email,
      createdAt: result?.result?.createdAt,
      updatedAt: result?.result?.updatedAt,
    });
  }

  async signIn(
    email: string,
    password: string,
    set: any
  ): Promise<Result<unknown>> {
    // log.debug("here")
    try {
      const findAdmin = await db.select().from(Admin).where(eq(Admin.email, email))
      if (!findAdmin[0]?.id) {
        return new Result(true, HttpStatusCode.BAD_REQUEST, "email not found");
      }

      const verifyPassword = await comparePassword(password, findAdmin[0]?.password);
      
      if (!verifyPassword) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "password is not correct"
        );
      }
      //TODO :  add  permissions  from  roles

      const accessToken = signJwt(
        {
          adminId: findAdmin[0]?.id,
        },
        Settings.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      if (!accessToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error signing accessToken"
        );
      }


      set.cookie[Settings.accessTokenCookieName] = {
        name: Settings.accessTokenCookieName,
        value: accessToken,
        maxAge: 60 * 60 ,
        path: "/",
      };

     
     
      // setCookie(Settings.accessTokenCookieName, accessToken, {
      //   path: "/",
      //   maxAge: 60 * 60,
      // });
      log.info(accessToken);

      // assign  refreshToken
      const refreshToken = signJwt(
        {
          adminId: findAdmin[0]?.id,
        },
        Settings.jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      if (!refreshToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error signing refreshToken"
        );
      }

      set.cookie[Settings.refreshTokenCookieName]= {
        name: Settings.refreshTokenCookieName,
        value: refreshToken,
        maxAge: 60 * 60 * 24,
        path: "/",
      }
      // setCookie(Settings.refreshTokenCookieName, refreshToken, {
      //   path: "/",
      //   maxAge: 60 * 60 * 24,
      // });
      // the  create  admin  session  in  db
      const decodedAccessToken = verifyJwt(accessToken, Settings.jwtSecret, {});

      if (!decodedAccessToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error decoding accessToken"
        );
      }

      log.info(decodedAccessToken);
      const decodedRefreshToken = verifyJwt(
        refreshToken,
        Settings.jwtSecret,
        {}
      );
      if (!decodedRefreshToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error decoding refreshToken"
        );
      }

      log.info(decodedRefreshToken);

      const createSession = await this.adminSessionService.create({
        adminId: findAdmin[0]?.id,
        activeExpires: (decodedAccessToken as any).exp,
        idleExpires: (decodedRefreshToken as any).exp,
      });

      if (!createSession?.result?.id) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error creating session"
        );
      }
      return new Result(false, HttpStatusCode.OK, "Sign In Success");
    } catch (error: any) {
      log.error(error);
      return new Result(
        true,
        HttpStatusCode.BAD_REQUEST,
        error?.message || "error signing in"
      );
    }
  }

  async exchangeToken(cookie: any, setCookie: any) {
    try {
      // check  cookie
      if (!cookie) {
        throw new Error("invalid cookie");
      }
      const refreshToken = cookie[Settings.refreshTokenCookieName];
      if (!refreshToken) {
        throw new Error("invalid token");
        // return new Result(
        //   true,
        //   HttpStatusCode.UNAUTHORIZED,
        //   "invalid token",
        //   undefined
        // );
      }
      const decodedRefreshToken = verifyJwt(
        refreshToken,
        Settings.jwtSecret,
        {}
      );

      if (!decodedRefreshToken) {
        throw new Error("invalid token");
        // return new Result(
        //   true,
        //   HttpStatusCode.UNAUTHORIZED,
        //   "invalid token",
        //   undefined
        // );
      }
      const adminId = (decodedRefreshToken as any)?.adminId;
      if (!adminId) {
        throw new Error("invalid token");
        // return new Result(
        //   true,
        //   HttpStatusCode.UNAUTHORIZED,
        //   "invalid token",
        //   undefined
        // );
      }
      //fetch  admin
      const admin = await this.getOne(adminId);

      if (!admin?.result?.id) {
        throw new Error("No Admin Found");
        // return new Result(
        //   true,
        //   HttpStatusCode.UNAUTHORIZED,
        //   "invalid token",
        //   undefined
        // );
      }
      //TODO: Assign Permissions

      // create  new  access  token
      const accessToken = signJwt(
        {
          adminId: admin?.result?.id,
        },
        Settings.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      if (!accessToken) {
        throw new Error("error signing accessToken");
        // return new Result(
        //   true,
        //   HttpStatusCode.BAD_REQUEST,
        //   "error signing accessToken"
        // );
      }
      setCookie(Settings.accessTokenCookieName, accessToken, {
        path: "/",
        maxAge: 60 * 60,
      });
      log.info(accessToken);

      return new Result(false, HttpStatusCode.OK, "Token Exchanged");
    } catch (error: any) {
      setCookie(Settings.accessTokenCookieName, "", {
        path: "/",
        maxAge: 60 * 60,
      });

      return new Result(
        true,
        HttpStatusCode.UNAUTHORIZED,
        error?.message || "invalid token",
        undefined
      );
    }
  }

  
}

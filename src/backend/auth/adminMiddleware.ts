import { verifyJwt } from "../core/jwt";
import { Result } from "../core/result";
import { Settings } from "../core/settings";
import { HttpStatusCode } from "../core/statusCodes";

export function adminAuthMiddleware(cookie: any) {
  try {
    if (Settings.disableAuthentication) {
      return;
    }
    if (!cookie) {
      return new Result(
        true,
        HttpStatusCode.UNAUTHORIZED,
        "invalid cookie",
        undefined
      );
    }
    console.log("cookie", cookie);
    const token = cookie[Settings.accessTokenCookieName];
    if (!token) {
      return new Result(
        true,
        HttpStatusCode.UNAUTHORIZED,
        "invalid token",
        undefined
      );
    }
    console.log("cookie", cookie);
    const payload = verifyJwt(token, Settings.jwtSecret, {});
    if (!payload) {
      return new Result(
        true,
        HttpStatusCode.UNAUTHORIZED,
        "invalid token payload",
        undefined
      );
    }
    const data = payload as any;

    if (!data.adminId) {
      return new Result(
        true,
        HttpStatusCode.UNAUTHORIZED,
        "invalid token payload",
        undefined
      );
    }
    //check  for  the  permissions  next  for  the  next  middleware
  } catch (error: any) {
    return new Result(
      true,
      HttpStatusCode.UNAUTHORIZED,
      error?.message || "invalid token",
      undefined
    );
  }
}

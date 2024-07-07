import { Service } from "../../core/service";
import { BuyerDao } from "./buyer.dao";
import { Result } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";
// import { redis } from
import { log } from "../../core/log";
import { Settings } from "../../core/settings";
import { signJwt, verifyJwt } from "../../core/jwt";
import { Buyer } from "../../db/schema";
import { db } from "@/backend/db/connection";
import { eq } from "drizzle-orm";

export class BuyerService extends Service<typeof Buyer> {
  dao: BuyerDao;
  constructor(dao: BuyerDao) {
    super(dao);
    this.dao = dao;
  }

  generateOTP() {
    if (Settings.bypassOtp) {
      return "000000";
    }
    // Declare a digits variable
    // which stores all digits
    let digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  async sendOtp(phone: string) {
    try {
      const buyer = await db.select().from(Buyer).where(eq(Buyer.phone, phone));

      let buyerId: string | undefined =
        buyer && buyer[0] ? buyer[0]?.id : undefined;

      if (!buyerId) {
        const createBuyer = await db.insert(Buyer).values({
          phone,
        })

        // const createBuyer = await prisma.buyer.create({
        //   data: {
        //     phone,
        //   },
        // });
        if (!createBuyer?.id) {
          return new Result(
            true,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "failed to create buyer",
            undefined
          );
        }
        buyerId = createBuyer.id;
      }

      if (buyerId) {
        const otp = this.generateOTP();
        const hashed = await password.hash(otp, {
          algorithm: "bcrypt",
          cost: 10,
        });

        if (!hashed) {
          return new Result(
            true,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "failed to hash otp",
            undefined
          );
        }

        log.info(
          {
            otp,
            hashed,
            buyerId,
          },
          "buyer/sendOtp"
        );

        const savedToRedis = await redis.set(buyerId, hashed);
        const expired = await redis.expire(buyerId, 600);

        if (!savedToRedis || !expired) {
          return new Result(
            true,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "failed to save otp to redis",
            undefined
          );
        }

        //send  otp  with  service

        return new Result(
          false,
          HttpStatusCode.OK,
          "otp sent successfully",
          undefined
        );
      } else {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "failed to get buyer",
          undefined
        );
      }
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.message || "failed to send otp",
        undefined
      );
    }
  }

  async verifyOtp(phone: string, otp: string, set: SetType) {
    try {
      const buyer = await prisma.buyer.findFirst({
        where: {
          phone,
        },
      });

      if (!buyer || !buyer?.id) {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "No buyer found with this phone number",
          undefined
        );
      }

      const redisBuyer = await redis.get(buyer?.id);
      if (!redisBuyer) {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "No otp found, resend otp",
          undefined
        );
      }

      log.info(
        {
          redisBuyer,
          otp,
        },
        "buyer/verifyOtp"
      );

      const verified = await password.verify(otp, redisBuyer);

      if (!verified) {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "Invalid otp",
          undefined
        );
      }

      //set cookie
      const accessToken = signJwt(
        {
          buyerId: buyer?.id,
        },
        Settings.jwtSecret,
        {
          expiresIn: "1d",
        }
      );
      if (!accessToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error signing accessToken"
        );
      }

      log.info(accessToken);

      // assign  refreshToken
      const refreshToken = signJwt(
        {
          buyerId: buyer?.id,
        },
        Settings.jwtSecret,
        {
          expiresIn: "30d",
        }
      );
      if (!refreshToken) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error signing refreshToken"
        );
      }

      if (set?.cookie) {
        set.cookie[Settings.accessTokenCookieName] = {
          value: accessToken,
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
        };
        set.cookie[Settings.refreshTokenCookieName] = {
          value: refreshToken,
          expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
        };
      } else {
        return new Result(
          true,
          HttpStatusCode.NOT_IMPLEMENTED,
          "set cookie not implemented",
          set?.cookie
        );
      }

      log.info(set.cookie);
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

      const createSession = await prisma.buyerSession.create({
        data: {
          buyerId: buyer?.id,
          activeExpires: (decodedAccessToken as any).exp,
          idleExpires: (decodedRefreshToken as any).exp,
        },
      });

      if (!createSession?.id) {
        return new Result(
          true,
          HttpStatusCode.BAD_REQUEST,
          "error creating session"
        );
      }

      return new Result(
        false,
        HttpStatusCode.OK,
        "otp verified successfully",
        undefined
      );
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.message || "failed to verify otp",
        undefined
      );
    }
  }

  async getHousesSeenByBuyer(query: any) {
    try {
      const result = prisma.houseSeen.findMany({
        where: query,
      });
      if (!result) {
        return new Result(
          true,
          HttpStatusCode.NOT_FOUND,
          "failed to get houses seen by buyer",
          undefined
        );
      }
      return new Result(
        false,
        HttpStatusCode.OK,
        "houses seen by buyer",
        result
      );
    } catch (e) {
      log.error(e);
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "failed to get houses seen by buyer",
        undefined
      );
    }
  }

  async getHousesWishlistedByBuyer(query: any) {
    try {
      const result = await prisma.houseWishlist.findMany({
        where: query,
      });
      if (!result || !(result instanceof Array)) {
        return new Result(
          true,
          HttpStatusCode.NOT_FOUND,
          "failed to get houses wishlisted by buyer",
          undefined
        );
      }
      return new Result(
        false,
        HttpStatusCode.OK,
        "houses wishlisted by buyer",
        result
      );
    } catch (e) {
      log.error(e);
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "failed to get houses wishlisted by buyer",
        undefined
      );
    }
  }
}

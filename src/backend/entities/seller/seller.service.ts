import { Seller } from "@prisma/client";
import { Service } from "../../core/service";
import { SellerDao } from "./seller.dao";
import { prisma } from "../../db/prisma";
import { Result } from "../../core/result";
import { HttpStatusCode } from "../../core/statusCodes";
import { password } from "bun";
import { log } from "../../core/log";
import { redis } from "../../redis/redis";
import { Settings } from "../../core/settings";
import { signJwt, verifyJwt } from "../../core/jwt";

export class SellerService extends Service<Seller> {
  dao: SellerDao;
  constructor(dao: SellerDao) {
    super(dao);
    this.dao = dao;
  }
  generateOTP() {
    if(Settings.bypassOtp) {
      return "000000"
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
      const seller = await prisma.seller.findFirst({
        where: {
          phone,
        },
      });
      let sellerId: string | undefined = seller?.id;

      if (!sellerId) {
        const createSeller = await prisma.seller.create({
          data: {
            phone,
          },
        });
        if (!createSeller?.id) {
          return new Result(
            true,
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            "failed to create seller",
            undefined
          );
        }
        sellerId = createSeller.id;
      }

      if (sellerId) {
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
            sellerId,
          },
          "seller/sendOtp"
        );

        const savedToRedis = await redis.set(sellerId, hashed);
        const expired = await redis.expire(sellerId, 600);

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
          "failed to get seller",
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

  async verifyOtp(phone: string, otp: string, setCookie: any) {
    try {
      const seller = await prisma.seller.findFirst({
        where: {
          phone,
        },
      });

      if (!seller || !seller?.id) {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "No seller found with this phone number",
          undefined
        );
      }

      const redisSeller = await redis.get(seller?.id);
      if (!redisSeller) {
        return new Result(
          true,
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "No otp found, resend otp",
          undefined
        );
      }

      log.info(
        {
          redisSeller,
          otp,
        },
        "seller/verifyOtp"
      );
      
      const   verified = await password.verify(otp, redisSeller);
      

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
          sellerId: seller?.id,
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
      setCookie(Settings.accessTokenCookieName, accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      log.info(accessToken);

      // assign  refreshToken
      const refreshToken = signJwt(
        {
          sellerId: seller?.id,
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
      setCookie(Settings.refreshTokenCookieName, refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
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

      const createSession = await prisma.sellerSession.create({
        data: {
          sellerId: seller?.id,
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

  async getListedHouses(query: any) {
    try {
      const houses = await prisma.houseListing.findMany({
        where: query
      });
      if (!houses) {
        return new Result(
          true,
          HttpStatusCode.NOT_FOUND,
          "failed to fetch houses",
          undefined
        );
      }
      return new Result(
        false,
        HttpStatusCode.OK,
        "houses fetched successfully",
        houses
      );
    } catch (error: any) {
      return new Result(
        true,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error?.message || "failed to fetch houses",
        undefined
      );
    }
  }
}

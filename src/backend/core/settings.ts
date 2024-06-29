class SettingsClass {
  jwtSecret: string = "secret_uno";
  hashSecret: string = "secret_duo";
  cookieSecret: string = "secret_trio";
  accessTokenCookieName: string = "rezidenzz__1";
  refreshTokenCookieName: string = "rezidenzz__2";
  disableAuthentication: boolean = false;
  bypassOtp: boolean = false;
  redisURL: string = "redis://localhost:6379";

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "secret_uno";
    this.hashSecret = process.env.HASH_SECRET || "secret_duo";
    this.cookieSecret = process.env.COOKIE_SECRET || "secret_trio";
    this.accessTokenCookieName =
      process.env.ACCESS_TOKEN_COOKIE_NAME || "rezidenzz__1";
    this.refreshTokenCookieName =
      process.env.REFRESH_TOKEN_COOKIE_NAME || "rezidenzz__2";
    this.disableAuthentication =
      process.env.DISABLE_AUTHENTICATION === "true" ?? false;
    this.bypassOtp = process.env.BYPASS_OTP === "true" ?? false;
    this.redisURL = process.env.REDIS_URL || "redis://localhost:6379";
  }
}

export const Settings = new SettingsClass();

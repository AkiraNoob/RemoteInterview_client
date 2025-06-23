import {
  OptionsType,
  deleteCookie as deleteCookieLib,
  getCookie as getCookieLib,
  setCookie as setCookieLib,
} from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { clientSideAvailable } from "~/helpers/checkClientSideAvailable";

export enum EAuthCookiesKey {
  Token = "accessToken",
  Refresh = "refreshToken",
}

export enum EUserIdTypeKeys {
  UserId = "userId",
}

export enum EUserInforTypeKeys {
  Email = "userEmail",
}

class CookieCommons {
  private context?: GetServerSidePropsContext;
  constructor(context?: GetServerSidePropsContext) {
    this.context = context;
  }

  public setContext(context: GetServerSidePropsContext) {
    this.context = context;
  }

  public getCookie = (key: string) => {
    return this.context && !clientSideAvailable()
      ? getCookieLib(key, {
          req: this.context.req,
          res: this.context.res,
        }) ?? null
      : getCookieLib(key) ?? null;
  };

  public deleteCookie = (key: string) => {
    return this.context && !clientSideAvailable()
      ? deleteCookieLib(key, {
          req: this.context.req,
          res: this.context.res,
        })
      : deleteCookieLib(key);
  };

  public setCookie = (key: string, value: string, options?: OptionsType) => {
    return this.context && !clientSideAvailable()
      ? setCookieLib(key, value, {
          ...options,
          req: this.context.req,
          res: this.context.res,
        })
      : setCookieLib(key, value, options);
  };

  //user id
  public getUserId = () => {
    return this.getCookie(EUserIdTypeKeys.UserId);
  };

  public setUserId = (value: string, options?: OptionsType) => {
    return this.setCookie(EUserIdTypeKeys.UserId, value, options);
  };

  // token
  public getAccessToken = () => {
    return this.getCookie(EAuthCookiesKey.Token);
  };

  public setAccessToken = (value: string, options?: OptionsType) => {
    return this.setCookie(EAuthCookiesKey.Token, value, options);
  };

  public getRefreshToken = () => {
    return this.getCookie(EAuthCookiesKey.Refresh);
  };

  public setRefreshToken = (value: string, options?: OptionsType) => {
    return this.setCookie(EAuthCookiesKey.Refresh, value, options);
  };
}

const cookieCommons = new CookieCommons();

export default cookieCommons;

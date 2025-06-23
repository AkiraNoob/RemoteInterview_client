import { GetServerSidePropsContext } from "next";
import { PATH_NAME } from "~/constants/pathName";
import { clientSideAvailable } from "~/helpers/checkClientSideAvailable";
import cookieCommons, {
  EAuthCookiesKey,
  EUserIdTypeKeys,
} from "~/helpers/cookieCommon";
import { ILoginResponse } from "~/types/authentication.types";

export const setAuthCookies = (props: ILoginResponse) => {
  const { token, refreshTokenExpiryTime, refreshToken } = props;

  cookieCommons.setAccessToken(token, {
    expires: new Date(refreshTokenExpiryTime),
  });
  cookieCommons.setRefreshToken(refreshToken, {
    expires: new Date(refreshTokenExpiryTime),
  });
};

export const setUserInfoCookies = (props: ILoginResponse) => {
  cookieCommons.setUserId(props.userId.toString(), {
    expires: new Date(props.refreshTokenExpiryTime),
  });
};

export const serverSideIsLoggedIn = (context: GetServerSidePropsContext) => {
  if (context) {
    cookieCommons.setContext(context);
  }

  const userId = cookieCommons.getUserId();
  const accessToken = cookieCommons.getAccessToken();

  return {
    isLoggedIn: !!userId && !!accessToken,
    accessToken,
    userId,
  };
};

export const clearCookiesAndLocalStorage = (
  _context?: GetServerSidePropsContext
) => {
  cookieCommons.deleteCookie(EAuthCookiesKey.Token);
  cookieCommons.deleteCookie(EAuthCookiesKey.Refresh);
  cookieCommons.deleteCookie(EUserIdTypeKeys.UserId);

  if (clientSideAvailable()) {
    localStorage.clear();
  }
};

export const logout = () => {
  clearCookiesAndLocalStorage();
  window.location.href = PATH_NAME.HOME;
};

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PATH_NAME } from "~/constants/pathName";
import cookieCommons from "~/helpers/cookieCommon";
import useGetUserDetail from "./useGetUserDetail";

export default function useAccessCompany() {
  const navigation = useRouter();

  const accessToken = cookieCommons.getAccessToken();

  if (!accessToken) {
    navigation.push(PATH_NAME.LOGIN);
  }

  const userId = cookieCommons.getUserId();
  const { data, isFetched } = useGetUserDetail({
    userId: userId as string,
  });

  useEffect(() => {
    if (isFetched && !data?.companyRegistrationImage?.fileId) {
      navigation.push(PATH_NAME.REGISTER_COMPANY);
    }
  }, [data, isFetched]);
}

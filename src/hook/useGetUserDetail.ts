import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getUserDetail } from "~/api/user";
import { IQueryOptions } from "~/types/generic.types";
import { IUserDetailResponse } from "~/types/user.types";

export default function useGetUserDetail({
  userId,
  props,
}: {
  userId: string;
} & IQueryOptions<IUserDetailResponse>) {
  var query = useQuery<IUserDetailResponse, AxiosError>({
    ...props,
    queryKey: ["user_detail", userId],
    queryFn: async () => await getUserDetail(userId),
  });

  return query;
}

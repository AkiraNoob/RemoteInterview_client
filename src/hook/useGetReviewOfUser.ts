import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getReviewOfUser } from "~/api/review";
import { IPaginationResponse, IQueryOptions } from "~/types/generic.types";
import { IReviewDetail } from "~/types/review.types";

export default function useGetReviewOfUser({
  props,
  userId,
}: { userId: string } & IQueryOptions<IPaginationResponse<IReviewDetail>>) {
  const query = useQuery<IPaginationResponse<IReviewDetail>, AxiosError>({
    ...props,
    queryKey: ["review", userId],
    queryFn: async () => await getReviewOfUser(userId),
  });

  return {
    query,
  };
}

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteReview, postReviewOfUser, updateAReview } from "~/api/review";
import { IMutateOptions } from "~/types/generic.types";
import {
  ICreateReviewRequest,
  IReviewDetail,
  IUpdateReviewRequest,
} from "~/types/review.types";

export function usePostReviewOfUser({
  props,
}: IMutateOptions<IReviewDetail, ICreateReviewRequest>) {
  const mutation = useMutation<IReviewDetail, AxiosError, ICreateReviewRequest>(
    {
      ...props,
      mutationFn: postReviewOfUser,
    }
  );

  return {
    mutation,
  };
}

export function useUpdateReviewOfUser({
  props,
}: IMutateOptions<void, IUpdateReviewRequest>) {
  const mutation = useMutation<void, AxiosError, IUpdateReviewRequest>({
    ...props,
    mutationFn: updateAReview,
  });

  return {
    mutation,
  };
}

export function useDeleteReview({ props }: IMutateOptions<void, string>) {
  const mutation = useMutation<void, AxiosError, string>({
    ...props,
    mutationFn: deleteReview,
  });

  return {
    mutation,
  };
}

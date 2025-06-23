import httpRequest from "~/services/axios/httpRequest";
import { IPaginationResponse } from "~/types/generic.types";
import {
  ICreateReviewRequest,
  IReviewDetail,
  IUpdateReviewRequest,
} from "~/types/review.types";

export const getReviewOfUser = (userId: string) =>
  httpRequest.get<IPaginationResponse<IReviewDetail>>(`/review/${userId}`);

export const postReviewOfUser = (data: ICreateReviewRequest) =>
  httpRequest.post<IReviewDetail>(`/review/${data.companyId}`, data);

export const updateAReview = (data: IUpdateReviewRequest) =>
  httpRequest.put(`/review/${data.reviewId}`, data);

export const deleteReview = (reviewId: string) =>
  httpRequest.delete(`/review/${reviewId}`);

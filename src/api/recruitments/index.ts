import httpRequest from "~/services/axios/httpRequest";
import { IPaginationResponse } from "~/types/generic.types";
import {
  IApplicationDetail,
  IGetApplyingListOfARecruitment,
  IGetListRecruitmentOfAUser,
  IGetSuggestRecruitments,
  IMutateRecruitmentRequest,
  INewestRecruitmentSearchRequest,
  IRecruitmentDTO,
  IRecruitmentSearchRequest,
  IRespondApplicationRequest,
} from "~/types/recruitment.types";

export const postCreateRecruitment = (data: IMutateRecruitmentRequest) => {
  return httpRequest.post<IRecruitmentDTO>("/recruitment", data);
};

export const putUpdateRecruitment = (
  recrutmentId: string,
  data: IMutateRecruitmentRequest
) => {
  return httpRequest.put<IRecruitmentDTO>(`/recruitment/${recrutmentId}`, data);
};

export const getListRecruitment = (data: IRecruitmentSearchRequest) => {
  const queryObj: Record<string, string> = {
    keyword: data.keyword,
    pageNumber: data.pageNumber.toString(),
    pageSize: data.pageSize.toString(),
    minSalary: data.minSalary.toString(),
    maxSalary: data.maxSalary.toString(),
    minExperience: data.minExperience.toString(),
    provinceId: data.provinceId.toString(),
    districtId: data.districtId.toString(),
  };

  // Optional fields
  if (data.orderBy) {
    queryObj.orderBy = data.orderBy.join(",");
  }

  if (data.keywordIds) {
    queryObj.keywordIds = data.keywordIds.join(",");
  }

  if (data.advancedSearch) {
    queryObj["advancedKeyword"] = data.advancedSearch.keyword;
    queryObj["advancedFields"] = data.advancedSearch.fields.join(",");
  }
  const queryString = new URLSearchParams(queryObj).toString();

  return httpRequest.get<IPaginationResponse<IRecruitmentDTO>>(
    `/recruitment/list?${queryString}`
  );
};

export const getListNewestRecruitment = (
  data: INewestRecruitmentSearchRequest
) => {
  const queryObj: Record<string, string> = {};

  if (data.pageNumber !== undefined) {
    queryObj.pageNumber = data.pageNumber.toString();
  }

  queryObj.pageSize = data.pageSize.toString(); // required field

  if (data.tagId) {
    queryObj.tagId = data.tagId;
  }

  if (data.minSalary != null) {
    queryObj.minSalary = data.minSalary.toString();
  }

  if (data.minExperience != null) {
    queryObj.minExperience = data.minExperience.toString();
  }

  if (data.provinceId != null) {
    queryObj.provinceId = data.provinceId.toString();
  }

  const queryString = new URLSearchParams(queryObj).toString();

  return httpRequest.get<IPaginationResponse<IRecruitmentDTO>>(
    `/recruitment/newest?${queryString}`
  );
};

export const getDetailRecruitment = (recruitmentId: string) => {
  return httpRequest.get<IRecruitmentDTO>(`/recruitment/${recruitmentId}`);
};

export const applyForARecruitment = (recruitmentId: string, data: FormData) => {
  return httpRequest.put(`/recruitment/apply/${recruitmentId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getListRecruitmentOfAUser = (data: IGetListRecruitmentOfAUser) => {
  const queryObj: Record<string, string> = {
    employerId: data.employerId,
    pageNumber: data.pageNumber.toString(),
    pageSize: data.pageSize.toString(),
  };

  if (data.status) {
    queryObj[`status`] = data.status.toString();
  }

  const queryString = new URLSearchParams(queryObj).toString();

  return httpRequest.get<IPaginationResponse<IRecruitmentDTO>>(
    `/recruitment/list/${data.employerId}?${queryString}`
  );
};

export const getApplyingListOfARecruitment = (
  data: IGetApplyingListOfARecruitment
) => {
  const queryObj: Record<string, string> = {
    pageNumber: data.pageNumber.toString(),
    pageSize: data.pageSize.toString(),
    recruitmentId: data.recruitmentId,
  };

  if (data.status) {
    queryObj["status"] = data["status"].toString();
  }

  const queryString = new URLSearchParams(queryObj).toString();

  return httpRequest.get<IPaginationResponse<IApplicationDetail>>(
    `/recruitment/${data.recruitmentId}/apply?${queryString}`
  );
};

export const getSuggestRecruitments = (data: IGetSuggestRecruitments) => {
  const queryObj: Record<string, string> = {
    pageNumber: data.pageNumber.toString(),
    pageSize: data.pageSize.toString(),
    recruitmentId: data.recruitmentId,
  };

  const queryString = new URLSearchParams(queryObj).toString();

  return httpRequest.get<IPaginationResponse<IRecruitmentDTO>>(
    `/recruitment/suggest?${queryString}`
  );
};

export const putRespondApplication = ({
  applicationId,
  ...data
}: IRespondApplicationRequest) => {
  return httpRequest.put<string>(`/recruitment/respond/${applicationId}`, data);
};

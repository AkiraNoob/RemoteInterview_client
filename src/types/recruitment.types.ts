export interface IMutateRecruitmentRequest {
  title: string;
  // motivation: string;
  description: string;
  requirement: string;
  welfare: string;
  address: string;
  minExperience: number;
  maxSalary: number;
  provinceId: number;
  districtId: number;
  professionId?: string;
  expiredDate?: string | null;
}

export interface IRecruitmentDTO {
  id: string;
  title: string;
  // motivation: string;
  description: string;
  requirement: string;
  welfare: string;
  address: string;
  minExperience: number;
  maxSalary: number;
  provinceId: number;
  districtId: number;
  companyId: string;
  companyName: string;
  companyAddress: string;
  timeStamp: string;
  expiredData: string;
  numberOfApplicant: number | null;
  professionName: string;
}

export interface IRecruitmentSearchRequest {
  advancedSearch?: {
    fields: string[];
    keyword: string;
  };
  keyword: string;
  pageNumber: number;
  pageSize: number;
  orderBy?: string[];
  keywordIds?: string[];
  minSalary: number;
  maxSalary: number;
  minExperience: number;
  provinceId: number;
  districtId: number;
}

export interface INewestRecruitmentSearchRequest {
  pageNumber?: number;
  pageSize: number;
  tagId?: string | null;
  minSalary?: number | null;
  minExperience?: number | null;
  provinceId?: number | null;
}

export interface IApplyRecruitmentRequest {
  cv: File;
  usePreloadedCV: boolean;
}

export interface IGetListRecruitmentOfAUser {
  employerId: string;
  status?: RecruitmentStatusEnum;
  pageNumber: number;
  pageSize: number;
}

export enum RecruitmentStatusEnum {
  Open = 0,
  Expired = 1,
}

export enum UserRecruitmentStatusEnum {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface IGetApplyingListOfARecruitment {
  pageNumber: number;
  pageSize: number;
  recruitmentId: string;
  status?: UserRecruitmentStatusEnum;
}

export interface IGetSuggestRecruitments {
  recruitmentId: string;
  pageNumber: number;
  pageSize: number;
}

export interface IApplicationDetail {
  id: string;
  userId: string;
  recruitmentId: string;
  cv: {
    fileId: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
  };
  user: {
    fullName: string;
    avatar: string;
    email: string;
    description: string;
  };
  status: UserRecruitmentStatusEnum;
}

export interface IRespondApplicationRequest {
  status: UserRecruitmentStatusEnum;
  applicationId: string;
}

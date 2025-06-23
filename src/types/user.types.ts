export interface IUserDetailResponse {
  id: string;
  dateOfBirth: string;
  fullName: string;
  description?: string;
  avatar?: IFileDTO;
  cv?: IFileDTO;
  email: string;
  phoneNumber: string;
  address: string;
  provinceId: number;
  districtId: number;
  taxNumber?: string;
  companyRegistrationImage?: IFileDTO;
}

interface IFileDTO {
  fileId: string;
  fileType: string;
  fileUrl: string;
  fileName: string;
}

export interface IUpdateUserRequest {
  userId: string;
  dateOfBirth?: string;
  fullName: string;

  phoneNumber: string;
  address: string;
  provinceId: number;
  districtId: number;
  taxNumber?: string;
  avatar?: File;
  cv?: File;
  companyRegistrationImage?: File;
}

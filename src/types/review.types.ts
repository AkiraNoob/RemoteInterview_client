export interface IReviewDetail {
  rating: number;
  comment: string;
  reviewer: {
    fullName: string;
    avatar?: string;
    email: string;
    description?: string;
  };
  isOwner: boolean;
}

export interface ICreateReviewRequest {
  content: string;
  rating: number;
  companyId: string; // UUID
}

export interface IUpdateReviewRequest {
  content: string;
  rating: number;
  reviewId: string; // UUID
}

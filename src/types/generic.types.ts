import { MutateOptions, QueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPaginationResponse<T = any> extends IPaginationMeta {
  data: T[];
}

export interface IQueryOptions<T> {
  props?: QueryOptions<T, AxiosError>;
}

export interface IMutateOptions<T, K> {
  props?: MutateOptions<T, AxiosError, K>;
}

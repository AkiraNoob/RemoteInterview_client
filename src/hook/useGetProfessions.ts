import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAllProfessions } from "~/api/professions";
import { IQueryOptions } from "~/types/generic.types";
import { IProfesisonDTO } from "~/types/profession.types";

export default function useGetProfessions({
  props,
}: IQueryOptions<IProfesisonDTO[]>) {
  const query = useQuery<IProfesisonDTO[], AxiosError>({
    ...props,
    queryKey: ["professions"],
    queryFn: getAllProfessions,
  });
  return { query };
}

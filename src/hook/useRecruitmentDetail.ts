import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getDetailRecruitment } from "~/api/recruitments";
import { IQueryOptions } from "~/types/generic.types";
import { IRecruitmentDTO } from "~/types/recruitment.types";

export default function useRecruitmentDetail({
  recruitmentId,
  props,
}: {
  recruitmentId?: string;
} & IQueryOptions<IRecruitmentDTO>) {
  const query = useQuery<IRecruitmentDTO, AxiosError>({
    ...props,
    queryKey: ["recruitment_detail", recruitmentId],
    queryFn: async () => await getDetailRecruitment(recruitmentId!),
    enabled: !!recruitmentId,
  });

  return {
    query,
  };
}

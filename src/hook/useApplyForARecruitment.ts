import { useMutation } from "@tanstack/react-query";
import { applyForARecruitment } from "~/api/recruitments";
import { IMutateOptions } from "~/types/generic.types";

export default function useApplyForARecruitment({
  recruitmentId,
  props,
}: IMutateOptions<unknown, FormData> & {
  recruitmentId: string;
}) {
  const mutation = useMutation({
    ...props,
    mutationFn: async (data: FormData) =>
      await applyForARecruitment(recruitmentId, data),
  });

  return {
    mutation,
  };
}

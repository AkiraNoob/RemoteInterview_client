import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { putRespondApplication } from "~/api/recruitments";
import { IMutateOptions } from "~/types/generic.types";
import { IRespondApplicationRequest } from "~/types/recruitment.types";

export function useRespondApplication({
  props,
}: IMutateOptions<string, IRespondApplicationRequest>) {
  const mutation = useMutation<string, AxiosError, IRespondApplicationRequest>({
    ...props,
    mutationFn: putRespondApplication,
  });

  return { mutation };
}

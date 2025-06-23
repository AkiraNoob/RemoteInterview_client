import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { putResponseMeetingInvitation } from "~/api/meeting";
import { IMutateOptions } from "~/types/generic.types";
import { IRespondMeetingInvitationRequest } from "~/types/meeting.types";

export default function useRespondMeetingInvitation({
  props,
}: IMutateOptions<unknown, IRespondMeetingInvitationRequest>) {
  const mutation = useMutation<
    unknown,
    AxiosError,
    IRespondMeetingInvitationRequest
  >({
    ...props,
    mutationFn: putResponseMeetingInvitation,
  });

  return {
    mutation,
  };
}

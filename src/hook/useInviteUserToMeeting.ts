import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postInviteUserToMeeting } from "~/api/meeting";
import { IMutateOptions } from "~/types/generic.types";
import { IInviteUserToMeetingRequest } from "~/types/meeting.types";

export default function useInviteUserToMeeting({
  props,
}: IMutateOptions<unknown, IInviteUserToMeetingRequest>) {
  const mutation = useMutation<
    unknown,
    AxiosError,
    IInviteUserToMeetingRequest
  >({
    ...props,
    mutationFn: postInviteUserToMeeting,
  });

  return { mutation };
}

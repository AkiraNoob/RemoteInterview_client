import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createMeeting, updateMeeting } from "~/api/meeting";
import { IMutateOptions } from "~/types/generic.types";
import {
  ICreateMeetingRequest,
  IMeetingListItemDTO,
  IUpdateMeetingRequest,
} from "~/types/meeting.types";

export function useCreateMeeting({
  props,
}: IMutateOptions<IMeetingListItemDTO, ICreateMeetingRequest>) {
  const mutation = useMutation<
    IMeetingListItemDTO,
    AxiosError,
    ICreateMeetingRequest
  >({
    ...props,
    mutationFn: createMeeting,
  });

  return {
    mutation,
  };
}

export function useUpdateMeeting({
  props,
}: IMutateOptions<IMeetingListItemDTO, IUpdateMeetingRequest>) {
  const mutation = useMutation<
    IMeetingListItemDTO,
    AxiosError,
    IUpdateMeetingRequest
  >({
    ...props,
    mutationFn: updateMeeting,
  });

  return {
    mutation,
  };
}

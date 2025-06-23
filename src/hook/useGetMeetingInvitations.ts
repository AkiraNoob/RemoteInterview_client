import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAllPendingMeetingInvitation } from "~/api/meeting";
import { IQueryOptions } from "~/types/generic.types";
import { IMeetingInvitationDTO } from "~/types/meeting.types";

export default function useGetAllPendingMeetingInvitation({
  props,
}: IQueryOptions<IMeetingInvitationDTO[]>) {
  const query = useQuery<IMeetingInvitationDTO[], AxiosError>({
    ...props,
    queryKey: ["pending_meeting_invitations"],
    queryFn: getAllPendingMeetingInvitation,
  });

  return {
    query,
  };
}

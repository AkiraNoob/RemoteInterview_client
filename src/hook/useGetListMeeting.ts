import { useQuery } from "@tanstack/react-query";
import { getListMeeting } from "~/api/meeting";
import { Event } from "~/types";
import { IQueryOptions } from "~/types/generic.types";
import {
  IGetListMeetingRequest,
  IMeetingListItemDTO,
} from "~/types/meeting.types";

export default function useGetListMeeting({
  props,
  data,
}: IQueryOptions<IMeetingListItemDTO[]> & {
  data: IGetListMeetingRequest;
}) {
  const query = useQuery({
    ...props,
    queryKey: ["list_meeting"],
    queryFn: () => getListMeeting(data),
  });

  return {
    query,
  };
}

export const convertDtoToEvent = (dto: IMeetingListItemDTO): Event => {
  return {
    title: dto?.title ?? "",
    description: dto?.description ?? "",
    startDate: dto?.startTime ? new Date(dto.startTime) : new Date(),
    endDate: dto?.endTime ? new Date(dto.endTime) : new Date(),
    id: dto.id,
    recruitmentId: dto.recruitmentId,
  };
};

export const convertEventToDto = (dto: Event): IMeetingListItemDTO => {
  return {
    startTime: dto.startDate.toISOString(),
    endTime: dto.endDate.toISOString(),
    recruitmentId: dto.recruitmentId,
    description: dto.description,
    title: dto.title,
    id: dto.id,
  };
};

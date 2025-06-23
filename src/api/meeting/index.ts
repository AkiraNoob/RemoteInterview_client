import httpRequest from "~/services/axios/httpRequest";
import {
  ICreateMeetingRequest,
  IDetailedMeetingDTO,
  IGetListMeetingRequest,
  IInviteUserToMeetingRequest,
  IMeetingInvitationDTO,
  IMeetingListItemDTO,
  IRespondMeetingInvitationRequest,
  IUpdateMeetingRequest,
} from "~/types/meeting.types";

export const getListMeeting = (data: IGetListMeetingRequest) => {
  const queryString = new URLSearchParams({ ...data }).toString();

  return httpRequest.get<IMeetingListItemDTO[]>(`/meeting/list?${queryString}`);
};

export const createMeeting = (data: ICreateMeetingRequest) =>
  httpRequest.post<IMeetingListItemDTO>("/meeting", data);

export const updateMeeting = (data: IUpdateMeetingRequest) =>
  httpRequest.put<IMeetingListItemDTO>("/meeting", data);

export const getMeetingDetail = (meetingId: string) =>
  httpRequest.get<IDetailedMeetingDTO>(`/meeting/${meetingId}`);

export const postInviteUserToMeeting = (data: IInviteUserToMeetingRequest) =>
  httpRequest.post(`/meeting/invite`, data);

export const getAllPendingMeetingInvitation = () =>
  httpRequest.get<IMeetingInvitationDTO[]>("/meeting/invitations");

export const putResponseMeetingInvitation = (
  data: IRespondMeetingInvitationRequest
) =>
  httpRequest.put(`/meeting/invite/${data.invitationId}`, {
    status: data.status,
  });

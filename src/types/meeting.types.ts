export interface IGetListMeetingRequest {
  startTime: string;
  endTime: string;
}

export interface ICreateMeetingRequest {
  startTime: string;
  endTime: string;
  recruitmentId: string;
  visitorIds: string[];
  description: string;
  title: string;
}

export interface IUpdateMeetingRequest {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  meetingId: string;
}

export interface IDetailedMeetingDTO {
  id: string;
  startTime: string;
  endTime: string;
  recruitmentId: string;
  recruitmentTitle: string;
  description: string;
  title: string;
  participants: IMeetingParticipantDTO[];
}

export interface IMeetingParticipantDTO {
  fullName: string;
  avatar: string;
  email: string;
  description: string;
}

export interface IMeetingListItemDTO {
  id: string;
  startTime: string;
  endTime: string;
  recruitmentId: string;
  description: string;
  title: string;
}

export interface IInviteUserToMeetingRequest {
  userId: string;
  meetingId: string;
}

export interface IRespondMeetingInvitationRequest {
  invitationId: string;
  status: UserMeetingStatusEnum;
}

export enum UserMeetingStatusEnum {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
}

export interface IMeetingInvitationDTO {
  id: string;
  meetingId: string;
  userId: string;
  role: UserMeetingRoleEnum;
  status: UserMeetingStatusEnum;
  employerName: string;
  recruitmentTitle: string;
  startTime: string;
  endTime?: string;
}

export enum UserMeetingRoleEnum {
  Owner = 0,
  Guest = 1,
}

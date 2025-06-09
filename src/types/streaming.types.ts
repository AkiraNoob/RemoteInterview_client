export interface RemoteStreams {
  [connectionId: string]: MediaStream;
}

export interface PeerConnections {
  [connectionId: string]: RTCPeerConnection;
}

export interface VideoRefs {
  [connectionId: string]: React.RefObject<HTMLVideoElement>;
}

interface IForwardStreamingMessageBase {
  receiverConnectionId: string;
  callerConnectionId: string;
}

export interface ISignalPayload extends IForwardStreamingMessageBase {
  signal: RTCSessionDescriptionInit;
}

export interface IIceCandidatePayload extends IForwardStreamingMessageBase {
  candidate: RTCIceCandidateInit;
}

export interface IReceiveOfferPayload
  extends Omit<ISignalPayload, "receiverConnectionId" | "callerConnectionId"> {
  sourceConnectionId: string;
}

export interface IReceiveAnswerPayload
  extends Omit<ISignalPayload, "receiverConnectionId" | "callerConnectionId"> {
  sourceConnectionId: string;
}

export interface IReceiveIceCandidatePayload
  extends Omit<
    IIceCandidatePayload,
    "receiverConnectionId" | "callerConnectionId"
  > {
  sourceConnectionId: string;
}

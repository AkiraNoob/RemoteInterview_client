"use client";

import * as signalR from "@microsoft/signalr";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  IIceCandidatePayload,
  IReceiveAnswerPayload,
  IReceiveIceCandidatePayload,
  IReceiveOfferPayload,
  ISignalPayload,
  PeerConnections,
  RemoteStreams,
  VideoRefs,
} from "~/types/streaming.types";

const SIGNALING_SERVER_URL =
  process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL ||
  "https://localhost:7063/streaming";

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: [
    // { urls: "stun:stun.l.google.com:19302" },
    {
      urls: "TURN:freestun.net:3478",
      username: "free",
      credential: "free",
    },
  ],
  iceTransportPolicy: "relay",
};

const useStreamingHook = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStreams>({});
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);

  const hubConnectionRef = useRef<signalR.HubConnection | null>(null);
  const peerConnectionsRef = useRef<PeerConnections>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<VideoRefs>({});

  const getRemoteVideoRef = (
    connectionId: string
  ): React.RefObject<HTMLVideoElement> => {
    if (!remoteVideoRefs.current[connectionId]) {
      remoteVideoRefs.current[connectionId] =
        React.createRef<HTMLVideoElement>() as React.RefObject<HTMLVideoElement>;
    }
    return remoteVideoRefs.current[connectionId];
  };

  const cleanupPeerConnection = (peerConnectionId: string) => {
    const pc = peerConnectionsRef.current[peerConnectionId];
    if (pc) {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.oniceconnectionstatechange = null;
      pc.onconnectionstatechange = null;
      pc.onicegatheringstatechange = null;
      pc.onicecandidateerror = null;
      pc.close();
      delete peerConnectionsRef.current[peerConnectionId];
    }
    setRemoteStreams((prev) => {
      if (!prev[peerConnectionId]) return prev;
      const newStreams = { ...prev };
      delete newStreams[peerConnectionId];
      return newStreams;
    });
    if (remoteVideoRefs.current[peerConnectionId]) {
      delete remoteVideoRefs.current[peerConnectionId];
    }
  };

  const getLocalMedia = async () => {
    if (localStream) {
      return localStream;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getAudioTracks().forEach((track) => (track.enabled = !isMicMuted));
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isCameraOff));
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("[Media] Error accessing media devices.", error);
      alert("Could not access camera/mic.");
      return null;
    }
  };

  const stopScreenShare = async (stopMediaStream = true) => {
    const currentScreenStream = screenStream;
    if (stopMediaStream && currentScreenStream) {
      currentScreenStream.getTracks().forEach((track) => track.stop());
    }

    setScreenStream(null);
    setIsScreenSharing(false);

    const currentLocalStream = localStream;
    const cameraVideoTrack = currentLocalStream?.getVideoTracks()[0];

    Object.values(peerConnectionsRef.current).forEach((pc) => {
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");
      if (sender) {
        if (cameraVideoTrack && !isCameraOff) {
          sender
            .replaceTrack(cameraVideoTrack)
            .catch((e) => console.error("Err replace track:", e));
        } else {
          try {
            pc.removeTrack(sender);
          } catch (e) {
            console.warn("Err remove track:", e);
          }
        }
      }
    });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject =
        currentLocalStream && !isCameraOff ? currentLocalStream : null;
    }
  };

  const getScreenMedia = async () => {
    if (isScreenSharing) {
      await stopScreenShare();
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setScreenStream(stream);
      setIsScreenSharing(true);
      const screenVideoTrack = stream.getVideoTracks()[0];
      const currentLocalStream = localStream;
      Object.values(peerConnectionsRef.current).forEach((pc) => {
        const sender = pc.getSenders().find((s) => s.track?.kind === "video");
        if (sender) {
          sender
            .replaceTrack(screenVideoTrack)
            .catch((e) => console.error("Err replace track:", e));
        } else {
          pc.addTrack(screenVideoTrack, currentLocalStream || stream);
        }
      });
      screenVideoTrack.onended = () => {
        if (screenStream?.id === stream.id) {
          stopScreenShare(false);
        }
      };
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("[Media] Error screen share.", error);
      setIsScreenSharing(false);
    }
  };

  // --- WebRTC Signaling and Connection Logic ---
  const createPeerConnection = useCallback(
    (peerConnectionId: string, streamToAdd: MediaStream | null) => {
      if (!streamToAdd) {
        return null;
      }
      if (peerConnectionsRef.current[peerConnectionId]) {
        return peerConnectionsRef.current[peerConnectionId];
      }

      const pc = new RTCPeerConnection(PEER_CONNECTION_CONFIG);

      pc.onicecandidate = (event) => {
        if (
          event.candidate &&
          hubConnectionRef.current?.state ===
            signalR.HubConnectionState.Connected
        ) {
          hubConnectionRef.current.invoke("IceCandidate", {
            receiverConnectionId: peerConnectionId,
            callerConnectionId: connectionId,
            candidate: event.candidate,
          } as IIceCandidatePayload);
        } else if (!event.candidate) {
          console.log(
            `[PC ${peerConnectionId}] ICE Candidate gathering complete.`
          );
        }
      };

      pc.onicecandidateerror = (event) => {
        console.error(
          `[PC ${peerConnectionId}] ICE Candidate Error:`,
          (event as any)?.errorCode,
          (event as any)?.errorText
        );
      };

      pc.ontrack = (event) => {
        const stream = event.streams[0];
        if (stream) {
          setRemoteStreams((prev) => ({ ...prev, [peerConnectionId]: stream }));
        }
      };

      pc.onicegatheringstatechange = () => {
        console.log(
          `[PC ${peerConnectionId}] ICE Gathering State: ${pc.iceGatheringState}`
        );
      };

      pc.oniceconnectionstatechange = () => {
        console.log(
          `[PC ${peerConnectionId}] ICE Connection State: ${pc.iceConnectionState}`
        );
        if (
          pc.iceConnectionState === "failed" ||
          pc.iceConnectionState === "closed"
        ) {
          console.error(
            `[PC ${peerConnectionId}] ICE connection state is ${pc.iceConnectionState}. Cleaning up.`
          );
          cleanupPeerConnection(peerConnectionId);
        } else if (pc.iceConnectionState === "disconnected") {
          console.warn(
            `[PC ${peerConnectionId}] ICE connection state is disconnected. Waiting to see if it recovers or fails...`
          );
        }
      };

      streamToAdd.getTracks().forEach((track) => {
        try {
          pc.addTrack(track, streamToAdd);
        } catch (e) {
          console.error(
            `[PC ${peerConnectionId}] Error adding track ${track.kind}:`,
            e
          );
        }
      });

      peerConnectionsRef.current[peerConnectionId] = pc;
      return pc;
    },
    [cleanupPeerConnection, connectionId]
  );

  // --- SignalR Hub Connection Setup ---
  useEffect(() => {
    // Create SignalR connection
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALING_SERVER_URL, {})
      .configureLogging(signalR.LogLevel.Information)
      .build();

    hubConnectionRef.current = hubConnection;

    const startConnection = async () => {
      try {
        if (!localStream) {
          await getLocalMedia();
        }

        await hubConnection.start();
        setIsConnected(true);

        // Get connection ID
        try {
          const id = await hubConnection.invoke<string>("GetConnectionId");
          setConnectionId(id);
        } catch (err) {
          console.error("[SignalR] Error getting connection ID:", err);
        }

        // // Get local media stream
        // if (!localStream) {
        //   await getLocalMedia();
        // }
      } catch (err) {
        console.error("[SignalR] Connection failed:", err);
      }
    };

    // Handle connection events
    hubConnection.onclose((error) => {
      setIsConnected(false);
      setIsInRoom(false);
      setConnectionId(null);

      // Clean up peer connections
      Object.keys(peerConnectionsRef.current).forEach((id) =>
        cleanupPeerConnection(id)
      );

      setRemoteStreams({});
      peerConnectionsRef.current = {};
      remoteVideoRefs.current = {};
    });

    // Set up SignalR event handlers
    hubConnection.on("ExistingUsers", async (otherConnectionIds: string[]) => {
      const streamToOffer = screenStream || localStream;

      if (!streamToOffer) {
        console.error("[SignalR] 'ExistingUsers': No stream!");
        return;
      }

      otherConnectionIds.forEach(async (peerConnectionId) => {
        const pc = createPeerConnection(peerConnectionId, streamToOffer);
        if (pc) {
          try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            hubConnection.invoke("Offer", {
              receiverConnectionId: peerConnectionId,
              callerConnectionId: connectionId,
              signal: offer,
            } as ISignalPayload);
          } catch (error) {
            console.error(`[PC ${peerConnectionId}] Offer Error:`, error);
          }
        }
      });
    });

    hubConnection.on("UserJoined", (newConnectionId: string) => {
      console.log(`[SignalR] 'UserJoined': ${newConnectionId}`);
    });

    hubConnection.on("UserLeft", (leavingConnectionId: string) => {
      cleanupPeerConnection(leavingConnectionId);
    });

    hubConnection.on("OfferReceived", async (payload: IReceiveOfferPayload) => {
      const { signal: offer, sourceConnectionId } = payload;

      const stream = screenStream || localStream;
      if (!stream) {
        console.error(`[SignalR] 'ReceiveOffer': No stream!`);
        return;
      }

      const pc = createPeerConnection(sourceConnectionId, stream);
      if (pc) {
        try {
          if (
            pc.signalingState !== "stable" &&
            pc.signalingState !== "have-local-offer"
          ) {
            console.warn(
              `[PC ${sourceConnectionId}] Received offer in unexpected state: ${pc.signalingState}. Attempting anyway.`
            );
          }

          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          hubConnection.invoke("Answer", {
            receiverConnectionId: sourceConnectionId,
            callerConnectionId: connectionId,
            signal: answer,
          } as ISignalPayload);
        } catch (error) {
          console.error(
            `[PC ${sourceConnectionId}] Offer Handling Error:`,
            error
          );
        }
      }
    });

    hubConnection.on(
      "ReceiveAnswer",
      async (payload: IReceiveAnswerPayload) => {
        const { signal: answer, sourceConnectionId } = payload;
        console.log(`[SignalR] 'ReceiveAnswer' from ${sourceConnectionId}`);

        const pc = peerConnectionsRef.current[sourceConnectionId];
        // Check signaling state before setting remote description
        if (pc && pc.signalingState === "have-local-offer") {
          try {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
          } catch (error) {
            console.error(`[PC ${sourceConnectionId}] Answer Error:`, error);
          }
        } else if (pc) {
          console.warn(
            `[PC ${sourceConnectionId}] Received answer in unexpected state: ${pc.signalingState}.`
          );
        } else {
          console.warn(
            `[SignalR] Received answer for unknown peer ${sourceConnectionId}`
          );
        }
      }
    );

    hubConnection.on(
      "ReceiveIceCandidate",
      async (payload: IReceiveIceCandidatePayload) => {
        const { candidate, sourceConnectionId } = payload;
        const pc = peerConnectionsRef.current[sourceConnectionId];

        if (pc?.remoteDescription && candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error: any) {
            console.warn(
              `[PC ${sourceConnectionId}] Add ICE Candidate Error:`,
              error.message
            );
          }
        } else if (pc && !pc.remoteDescription) {
          console.warn(
            `[PC ${sourceConnectionId}] Received ICE candidate before remote description set.`
          );
        }
      }
    );

    // Start the connection
    startConnection();

    // Clean up on unmount
    return () => {
      console.log("[SignalR] Cleanup: Stopping connection...");

      if (
        hubConnectionRef.current &&
        hubConnectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        hubConnectionRef.current.stop();
      }

      hubConnectionRef.current = null;

      localStream?.getTracks().forEach((t) => t.stop());
      screenStream?.getTracks().forEach((t) => t.stop());

      setLocalStream(null);
      setScreenStream(null);

      Object.keys(peerConnectionsRef.current).forEach((id) =>
        cleanupPeerConnection(id)
      );

      peerConnectionsRef.current = {};
      remoteVideoRefs.current = {};
      setRemoteStreams({});
      setIsConnected(false);
      setIsInRoom(false);
      setConnectionId(null);
    };
  }, []);

  // Effect to attach remote streams
  useEffect(() => {
    Object.entries(remoteStreams).forEach(([connectionId, stream]) => {
      const videoRef = getRemoteVideoRef(connectionId);
      if (videoRef.current && videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
        videoRef.current
          .play()
          .catch((e) => console.warn(`Autoplay ${connectionId}: ${e.message}`));
      }
    });
  }, [remoteStreams, getRemoteVideoRef]);

  // --- UI Event Handlers ---
  const handleJoinRoom = useCallback(async () => {
    if (!roomId) {
      return;
    }

    if (
      !hubConnectionRef.current ||
      hubConnectionRef.current.state !== signalR.HubConnectionState.Connected
    ) {
      return;
    }

    let stream = localStream || (await getLocalMedia());
    if (!stream) {
      return;
    }

    console.log(`[UI] Invoking 'JoinRoom': ${roomId}`);
    try {
      await hubConnectionRef.current.invoke("JoinRoom", roomId);
      setIsInRoom(true);
    } catch (error) {
      console.error("[SignalR] Error joining room:", error);
    }
  }, [roomId, getLocalMedia]);

  const handleLeaveRoom = useCallback(async () => {
    if (
      hubConnectionRef.current &&
      hubConnectionRef.current.state === signalR.HubConnectionState.Connected &&
      isInRoom
    ) {
      try {
        await hubConnectionRef.current.invoke("LeaveRoom");
      } catch (error) {
        console.error("[SignalR] Error leaving room:", error);
      }
    }

    // Clean up connections regardless of server response
    Object.keys(peerConnectionsRef.current).forEach((id) =>
      cleanupPeerConnection(id)
    );

    setIsInRoom(false);
    setRemoteStreams({});
    peerConnectionsRef.current = {};
    remoteVideoRefs.current = {};
  }, [isInRoom, cleanupPeerConnection]);

  const toggleMic = useCallback(() => {
    setIsMicMuted((prev) => {
      const newState = !prev;
      localStream?.getAudioTracks().forEach((t) => (t.enabled = !newState));
      screenStream?.getAudioTracks().forEach((t) => (t.enabled = !newState));
      return newState;
    });
  }, []);

  const toggleCamera = useCallback(async () => {
    if (isScreenSharing) {
      return;
    }
    setIsCameraOff((prev) => {
      const newState = !prev;
      const stream = localStream;
      if (stream) {
        stream.getVideoTracks().forEach((t) => {
          t.enabled = !newState;
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = !newState ? stream : null;
        }
      } else if (!newState) {
        getLocalMedia();
      }
      return newState;
    });
  }, [isScreenSharing, getLocalMedia]);

  return {
    roomId,
    setRoomId,
    isConnected,
    isInRoom,
    isMicMuted,
    isCameraOff,
    isScreenSharing,
    connectionId,
    localVideoRef,
    remoteStreams,
    getRemoteVideoRef,
    handleJoinRoom,
    handleLeaveRoom,
    toggleMic,
    toggleCamera,
    getScreenMedia,
  };
};

export default useStreamingHook;

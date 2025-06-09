"use client";

import useStreamingHook from "~/hook/useStreamingHook";
import { cn } from "~/lib/utils";
import { SidebarProvider } from "../ui/sidebar";
import MeetingChat from "./MeetingChat";
import MeetingControlBar from "./MeetingControlBar";
import MeetingIndividual from "./MeetingIndividual";

export default function MeetingUI() {
  const {
    roomId,
    setRoomId,
    isConnected,
    isInRoom,
    isMicMuted,
    isCameraOff,
    connectionId,
    isScreenSharing,
    localVideoRef,
    remoteStreams,
    getRemoteVideoRef,
    handleJoinRoom,
    handleLeaveRoom,
    toggleMic,
    toggleCamera,
    getScreenMedia,
  } = useStreamingHook();

  // --- Rendering Logic ---
  const remoteUserIds = Object.keys(remoteStreams);

  console.log(localVideoRef);

  const amount = 3;
  const rowsNumber = amount >= 4 ? Math.floor(Math.sqrt(amount)) : 1;
  const itemPerRow =
    amount > 2
      ? Math.floor(amount / rowsNumber) + (amount % rowsNumber)
      : amount;

  return (
    <SidebarProvider>
      <div className="bg-black/90 w-full h-dvh flex flex-col">
        <div className="flex max-h-[calc(100dvh-80px)] flex-1">
          <div
            className={cn(
              "flex items-center justify-center gap-y-2 gap-x-5 p-5 flex-wrap flex-1"
            )}
          >
            {new Array(amount).fill(0).map((item, index) => (
              <MeetingIndividual
                key={index}
                ref={localVideoRef}
                isCameraOff={isCameraOff}
                isScreenSharing={isScreenSharing}
                isMicMuted={isMicMuted}
                name={"Phương"}
                className="h-full"
                style={{
                  aspectRatio: "16/9",
                  maxWidth: `calc(${100 / itemPerRow}% - 20px)`,
                  maxHeight: `calc(${100 / rowsNumber}% - 20px)`,
                }}
              />
            ))}
          </div>
          <MeetingChat />
        </div>
        <MeetingControlBar
          className="shrink-0 h-[80px]"
          isMicMuted={isMicMuted}
          isCameraOff={isCameraOff}
          isScreenSharing={isScreenSharing}
          toggleMic={toggleMic}
          toggleCamera={toggleCamera}
          getScreenMedia={getScreenMedia}
        />
      </div>
    </SidebarProvider>
  );
}

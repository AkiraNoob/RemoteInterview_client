import {
  Camera,
  CameraOff,
  MessageSquareText,
  Mic,
  MicOff,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  UsersRound,
} from "lucide-react";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export default function MeetingControlBar({
  isMicMuted,
  toggleMic,
  isCameraOff,
  toggleCamera,
  isScreenSharing,
  getScreenMedia,
  ...props
}: {
  isMicMuted: boolean;
  toggleMic: () => void;
  isCameraOff: boolean;
  toggleCamera: () => void;
  isScreenSharing: boolean;
  getScreenMedia: () => Promise<void>;
} & ComponentPropsWithoutRef<"div">) {
  const { toggleSidebar } = useSidebar();

  const offClassname =
    "bg-other-rested-bg hover:bg-other-rested-foreground text-c-text-light";

  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-between w-full px-5 relative",
        props.className
      )}
    >
      <div>
        <p className="text-lg font-semibold text-c-text-dark">Room code</p>{" "}
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4">
        <Button
          onClick={toggleMic}
          className={cn("rounded-full size-12", isMicMuted && offClassname)}
          size={"icon"}
          variant={"custom"}
        >
          {!isMicMuted ? (
            <Mic className="size-5.5" />
          ) : (
            <MicOff className="size-5.5" />
          )}
        </Button>
        <Button
          onClick={toggleCamera}
          className={cn("rounded-full size-12", isCameraOff && offClassname)}
          variant={"custom"}
          size={"icon"}
        >
          {!isCameraOff ? (
            <Camera className="size-5.5" />
          ) : (
            <CameraOff className="size-5.5" />
          )}
        </Button>
        <Button
          onClick={getScreenMedia}
          className={cn(
            "rounded-full size-12",
            !isScreenSharing && offClassname
          )}
          variant={"custom"}
          size={"icon"}
        >
          {!isScreenSharing ? (
            <ScreenShare className="size-5.5" />
          ) : (
            <ScreenShareOff className="size-5.5" />
          )}
        </Button>
        <Button className={cn("rounded-full size-12")} variant={"error"}>
          <PhoneOff className="size-5.5" />
        </Button>
      </div>
      <div className="text-c-text-dark justify-center flex gap-2 items-center">
        <Button
          className={
            "rounded-full size-12 hover:bg-other-rested-foreground/10 hover:text-c-text-dark"
          }
          size={"icon"}
          variant={"ghost"}
          onClick={toggleSidebar}
        >
          <MessageSquareText className="size-6" />
        </Button>

        <Button
          className={
            "rounded-full size-12 hover:bg-other-rested-foreground/10 hover:text-c-text-dark relative"
          }
          size={"icon"}
          variant={"ghost"}
        >
          <div className=""></div>
          <UsersRound className="size-6" />
        </Button>
      </div>
    </div>
  );
}

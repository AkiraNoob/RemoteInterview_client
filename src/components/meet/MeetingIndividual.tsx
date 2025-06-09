import { CameraOff, MicOff } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "~/lib/utils";

type TMeetingIndividual = {
  isCameraOff: boolean;
  isScreenSharing: boolean;
  isMicMuted: boolean;
  name: string;
};

const MeetingIndividual = forwardRef<
  HTMLVideoElement,
  TMeetingIndividual & ComponentPropsWithoutRef<"div">
>(function _(
  { isCameraOff, isMicMuted, isScreenSharing, name, ...props },
  ref
) {
  return (
    <div
      {...props}
      className={cn(
        "relative bg-c-text-light rounded-lg overflow-hidden shadow-lg items-center justify-center flex",
        props.className
      )}
    >
      {isCameraOff && !isScreenSharing && (
        <CameraOff
          className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          size={"20%"}
        />
      )}
      <video
        ref={ref}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-fit ${
          isCameraOff && !isScreenSharing ? "hidden" : ""
        }`}
        onError={(e) => console.error(`Video Error `, (e.target as any)?.error)}
      />
      <div className="absolute bottom-2 left-2">
        <p className="truncate font-normal text-c-text-dark text-[100%]">
          {name}
        </p>
      </div>
      {isMicMuted && (
        <div className="absolute flex items-center justify-center top-2 right-2 rounded-full p-2 bg-black/40 w-[1.75em] h-[1.75em]">
          <MicOff className="text-white" />
        </div>
      )}
    </div>
  );
});

export default MeetingIndividual;

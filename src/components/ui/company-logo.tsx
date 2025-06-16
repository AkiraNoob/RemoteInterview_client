import { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils";

export default function CompanyLogo({
  src = "/logo_title.png",
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  src: string;
}) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-lg bg-other-rested-bg border flex items-center p-1 shrink-0",
        props.className
      )}
    >
      <img src={src} alt={"company logo"} className="rounded-md" />
    </div>
  );
}

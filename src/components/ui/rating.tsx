import clsx from "clsx";
import { Star } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "~/lib/utils";

type RatingProps = {
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
};

export default function Rating({
  max = 5,
  value = 0,
  onChange,
  readOnly = false,
  size = 24,
  ...props
}: RatingProps &
  Omit<
    ComponentPropsWithoutRef<"div">,
    "onChange" | "value" | "max" | "readOnly" | "size"
  >) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div {...props} className={cn("flex items-center", props.className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1;
        const isFilled =
          hovered !== null ? hovered >= starValue : value >= starValue;

        return (
          <button
            key={i}
            type="button"
            onClick={() => !readOnly && onChange?.(starValue)}
            onMouseEnter={() => !readOnly && setHovered(starValue)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            disabled={readOnly}
            className={clsx("transition-colors", {
              "cursor-pointer": !readOnly,
              "cursor-default": readOnly,
            })}
          >
            <Star
              fill={isFilled ? "#facc15" : "none"}
              stroke="#facc15"
              width={size}
              height={size}
              className={clsx({ "opacity-50": !isFilled })}
            />
          </button>
        );
      })}
    </div>
  );
}

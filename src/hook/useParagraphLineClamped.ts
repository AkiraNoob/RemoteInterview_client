import { useEffect, useRef, useState } from "react";

const useParagraphLineClamped = ({
  linesAllowed,
  dependencies = [],
}: {
  linesAllowed: number;
  dependencies?: any[];
}) => {
  const contentRef = useRef<HTMLParagraphElement>(null);

  const [maxHeight, setMaxHeight] = useState<number | string>(0);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [isClamped, setIsClamped] = useState<boolean>(false);

  const [seeMore, setSeeMore] = useState(false);
  const toggleSeeMore = () => setSeeMore((p) => !p);

  // Calculate max height of post content
  // Each (line of text) or (gap between paragraphs) is:
  // line height * font size
  // Set maxHeight to be linesAllowed * (line height)
  useEffect(() => {
    if (!contentRef.current) return;
    setMaxHeight(
      Math.ceil(
        parseFloat(getComputedStyle(contentRef.current).lineHeight) *
          linesAllowed
      )
    );

    setIsClamped(
      typeof maxHeight === "number"
        ? (contentRef.current?.scrollHeight as number) > maxHeight
        : false
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef.current, ...dependencies]);

  // check to see if the content is line-clamped
  // i.e if the content is line-clamped, there is more text to be shown
  // use this to render "Xem thêm..." button

  const reAssignMaxHeight = () => {
    if (!contentRef.current) return;
    setMaxHeight(
      parseFloat(getComputedStyle(contentRef.current).lineHeight) * linesAllowed
    );
  };

  return {
    isClamped,
    contentRef,
    maxHeight,
    setMaxHeight,
    showSeeMore,
    setShowSeeMore,
    reAssignMaxHeight,
    seeMore,
    toggleSeeMore,
  };
};

export default useParagraphLineClamped;

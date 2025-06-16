"use client";

import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useState } from "react";
import useParagraphLineClamped from "~/hook/useParagraphLineClamped";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import Rating from "../ui/rating";
import { Textarea } from "../ui/textarea";

export default function CompanyReview() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 24;
  const hasNextPage = true;
  const hasPreviousPage = true;
  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-[1200px] mx-auto p-5 bg-white rounded-lg">
      <p className="text-2xl font-semibold text-c-primary mb-5">
        Đánh giá nhà tuyển dụng
      </p>

      <div className="space-y-2 my-5">
        <Rating value={rating} onChange={(value) => setRating(value)} />
        <div className="space-y-2 flex items-start gap-3">
          <Textarea
            className="placeholder:text-base border border-c-dark-primary/40 min-h-[80px] text-base"
            placeholder="Viết đánh giá của bạn"
          />
          <Button size={"icon"} variant={"custom"} className="rounded-full">
            <Send />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {new Array(5).fill(0).map((item, index) => (
          <CompanyReviewItem key={index} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 my-5">
        <Button
          disabled={!hasPreviousPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronLeft size={"5"} />
        </Button>
        <p className="text-c-text-light text-sm font-normal">
          {currentPage} / {totalPage} trang
        </p>
        <Button
          disabled={!hasNextPage}
          className={cn(
            "rounded-full size-9, border-c-primary hover:bg-c-primary hover:text-c-text-dark"
          )}
          size={"icon"}
          variant={"outline"}
        >
          <ChevronRight size={"5"} />
        </Button>
      </div>
    </div>
  );
}

function CompanyReviewItem() {
  const { contentRef, maxHeight, isClamped, seeMore, toggleSeeMore } =
    useParagraphLineClamped({
      linesAllowed: 3,
    });

  return (
    <div className="flex items-start gap-4">
      <img
        src="/avatar.jpg"
        alt="avatar"
        className="rounded-full w-[55px] aspect-square"
      />
      <div className="space-y-4 border w-full p-2 rounded-lg bg-other-rested-bg/50">
        <div className="space-y-1">
          <p className="font-semibold">Tên người lao động</p>
          <Rating readOnly />
          <p className="text-sm italic font-normal text-other_helper_text">
            dd/mm/yyyy
          </p>
        </div>
        <p
          style={{
            maxHeight: seeMore ? "none" : maxHeight,
            overflowY: "hidden",
          }}
          ref={contentRef}
          className="relative whitespace-pre-line break-word-legacy transition-all ease-linear text-lg"
        >
          Nội dung bình luận
          {isClamped && (
            <span
              className={`${
                !seeMore ? "absolute bottom-0 right-0 bg-white" : ""
              }`}
            >
              {!seeMore && (
                <span className="inline text-Primary/Main">... </span>
              )}
              <span
                onClick={toggleSeeMore}
                className="inline cursor-pointer text-Primary/Main hover:underline"
              >
                {seeMore ? " Thu gọn" : "Xem thêm"}
              </span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

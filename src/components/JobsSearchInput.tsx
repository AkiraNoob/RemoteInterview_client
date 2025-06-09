"use client";

import { MapPin, Search, X } from "lucide-react";
import { ComponentPropsWithoutRef, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

export default function JobsSearchInput(
  props: ComponentPropsWithoutRef<"div">
) {
  const [keyword, setKeyword] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const onSearch = () => {};
  const onClearKeyword = () => setKeyword("");
  const onClearLocation = () => setKeyword("");

  return (
    <div
      {...props}
      className={cn(
        "p-2 flex items-center gap-2 border-1 border-other_divider shadow-md rounded-xl max-w-[898px] w-full mx-auto bg-white",
        props.className
      )}
    >
      <div className="flex-1 flex items-center gap-2 px-3">
        <Search />
        <Input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="Tên công việc, từ khoá"
          className={"border-none focus-visible:ring-0 shadow-none"}
        />
        {keyword && <X onClick={onClearKeyword} />}
      </div>
      <Separator orientation="vertical" className="!h-5 bg-other_divider" />
      <div className="flex-1 flex items-center gap-2 px-3">
        <MapPin />
        <Input
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Vị trí"
          className={"border-none focus-visible:ring-0 shadow-none"}
        />
        {location && <X onClick={onClearLocation} />}
      </div>
      <Button variant={"custom"} onClick={onSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
}

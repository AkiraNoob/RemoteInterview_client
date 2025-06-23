"use client";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const RecruitmentModal = dynamic(() => import("./RecruitmentModal"), {
  ssr: false,
});

export default function AddRecruitmentButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen((p) => !p)} variant={"custom"}>
            <Plus />
            Thêm tin tuyển dụng mới
          </Button>
        </DialogTrigger>
        {open && <RecruitmentModal setOpen={setOpen} />}
      </Dialog>
    </>
  );
}

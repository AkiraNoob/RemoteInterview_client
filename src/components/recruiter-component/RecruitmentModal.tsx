"use client";

import { EditorState } from "draft-js";
import { ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { province } from "../../data/province_data";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ComboBox } from "../ui/combo-box";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function RecruitmentModal({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [provinceCode, setProvinceCode] = React.useState<string>("");
  const [districtCode, setDistrictCode] = React.useState<string>("");

  const [descriptionEditorState, setDescriptionEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());
  const [requirementEditorState, setRequirementEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());
  const [welfareEditorState, setWelfareEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());

  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <DialogContent
      showCloseButton={false}
      className="!max-w-[1000px] max-h-[800px] overflow-y-scroll w-full"
    >
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-2xl">Chi tiết tuyển dụng</DialogTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setOpen(false)}
          className="rounded-full "
        >
          <XIcon className="size-6" />
        </Button>
      </DialogHeader>
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="text-lg">Tiêu đề</Label>
          <Input placeholder="Tiêu đề tuyển dụng *" />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Mô tả</Label>
          <div>
            <Editor
              editorState={descriptionEditorState}
              wrapperClassName="border border-input rounded-lg"
              toolbarClassName="!rounded-t-lg !border-b-1 !border-b-input !pb-2"
              placeholder="Mô tả nội dung công việc *"
              editorClassName="px-2"
              onEditorStateChange={setDescriptionEditorState}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Yêu cầu</Label>
          <div>
            <Editor
              editorState={requirementEditorState}
              wrapperClassName="border border-input rounded-lg"
              toolbarClassName="!rounded-t-lg !border-b-1 !border-b-input !pb-2"
              placeholder="Yêu cầu công việc *"
              editorClassName="px-2"
              onEditorStateChange={setRequirementEditorState}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Phúc lợi</Label>
          <div>
            <Editor
              editorState={welfareEditorState}
              wrapperClassName="border border-input rounded-lg"
              toolbarClassName="!rounded-t-lg !border-b-1 !border-b-input !pb-2"
              placeholder="Phúc lợi công việc *"
              editorClassName="px-2"
              onEditorStateChange={setWelfareEditorState}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Địa chỉ</Label>
          <Input placeholder="Địa chỉ làm việc" />
          <div className="flex items-center gap-2 mt-2">
            <ComboBox
              className="flex-1"
              data={province.map((item) => ({
                value: item.code.toString(),
                label: item.name,
              }))}
              inputPlaceholder={"Tỉnh/ Thành phố *"}
              buttonPlaceholder={"Chọn tỉnh/ thành phố"}
              emptyText={""}
              value={provinceCode}
              setValue={setProvinceCode}
            />
            <ComboBox
              className="flex-1"
              data={province
                .find((item) => item.code.toString() === provinceCode)
                ?.districts?.map((item) => ({
                  value: item.code.toString(),
                  label: item.name,
                }))}
              inputPlaceholder={"Quận/ Huyện *"}
              buttonPlaceholder={"Chọn quận/ huyện"}
              emptyText={""}
              value={districtCode}
              setValue={setDistrictCode}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Kinh nghiệm tối thiểu</Label>
          <Input placeholder="Kinh nghiệm yêu cầu tối thiểu *" type="number" />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Mức lương tối đa</Label>
          <Input placeholder="Mức lương tối đa có thể trả *" type="number" />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Thời gian hết hạn</Label>
          <div className="flex flex-col gap-3">
            <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Chọn ngày kết thúc"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setOpenCalendar(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <p className="italic text-sm text-other_helper_text font-normal">
            Bài tuyển dụng sẽ khả dụng đến hết ngày được chọn
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button variant={"custom"}>Tạo</Button>
      </DialogFooter>
    </DialogContent>
  );
}

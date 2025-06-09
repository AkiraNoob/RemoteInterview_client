"use client";

import { EditorState } from "draft-js";
import { XIcon } from "lucide-react";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { province } from "../../data/province_data";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combo-box";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
          <XIcon />
        </Button>
      </DialogHeader>
      <div className="space-y-5">
        <div className="space-y-1">
          <Label className="text-lg">Tiêu đề</Label>
          <Input placeholder="Tiêu đề tuyển dụng" />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Mô tả</Label>
          <div>
            <Editor
              editorState={descriptionEditorState}
              wrapperClassName="border border-input rounded-lg"
              toolbarClassName="!rounded-t-lg !border-b-1 !border-b-input !pb-2"
              placeholder="Mô tả nội dung công việc"
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
              placeholder="Yêu cầu công việc"
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
              placeholder="Phúc lợi công việc"
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
              inputPlaceholder={"Tỉnh/ Thành phố"}
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
              inputPlaceholder={"Quận/ Huyện"}
              buttonPlaceholder={"Chọn quận/ huyện"}
              emptyText={""}
              value={districtCode}
              setValue={setDistrictCode}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Kinh nghiệm tối thiểu</Label>
          <Input placeholder="Kinh nghiệm yêu cầu tối thiểu" type="number" />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Mức lương tối đa</Label>
          <Input placeholder="Mức lương tối đa có thể trả" type="number" />
        </div>
      </div>
      <DialogFooter>
        <Button variant={"custom"}>Tạo</Button>
      </DialogFooter>
    </DialogContent>
  );
}

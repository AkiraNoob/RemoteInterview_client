"use client";

import { useMutation } from "@tanstack/react-query";
import { convertToHTML } from "draft-convert";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import { toast } from "sonner";
import {
  postCreateRecruitment,
  putUpdateRecruitment,
} from "~/api/recruitments";
import { concatAddress } from "~/helpers/stringHelper";
import useGetProfessions from "~/hook/useGetProfessions";
import useRecruitmentDetail from "~/hook/useRecruitmentDetail";
import { IMutateRecruitmentRequest } from "~/types/recruitment.types";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RecruitmentModal({
  setOpen,
  recruitmentId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  recruitmentId?: string;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [provinceCode, setProvinceCode] = React.useState<string>("");
  const [districtCode, setDistrictCode] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [minExperience, setMinExperience] = React.useState<string>("");
  const [maxSalary, setMaxSalary] = React.useState<string>("");
  const [professionId, setProfessionId] = React.useState<string>("");

  // const [motivateionEditorState, setMotivateionEditorState] =
  //   React.useState<EditorState>(EditorState.createEmpty());
  const [descriptionEditorState, setDescriptionEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());
  const [requirementEditorState, setRequirementEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());
  const [welfareEditorState, setWelfareEditorState] =
    React.useState<EditorState>(EditorState.createEmpty());

  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const disabledCondition =
    !title ||
    !provinceCode ||
    !districtCode ||
    !address ||
    !minExperience ||
    !maxSalary ||
    !date ||
    !professionId ||
    // !convertToHTML(motivateionEditorState.getCurrentContent()) ||
    !convertToHTML(descriptionEditorState.getCurrentContent()) ||
    !convertToHTML(requirementEditorState.getCurrentContent()) ||
    !convertToHTML(welfareEditorState.getCurrentContent());

  const {
    query: { data: recruitmentDetail },
  } = useRecruitmentDetail({
    recruitmentId: recruitmentId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: !recruitmentId
      ? postCreateRecruitment
      : async (data: IMutateRecruitmentRequest) =>
          await putUpdateRecruitment(recruitmentId, data),
    onSuccess(data, variables, context) {
      setOpen(false);
    },
    onError() {
      toast("Có lỗi xảy ra");
    },
  });

  React.useEffect(() => {
    if (recruitmentDetail) {
      setProvinceCode(recruitmentDetail?.provinceId.toString());
      setDistrictCode(recruitmentDetail?.districtId.toString());

      // {
      //   const blocksFromHTML = convertFromHTML(recruitmentDetail.motivation);
      //   const contentState = ContentState.createFromBlockArray(
      //     blocksFromHTML.contentBlocks,
      //     blocksFromHTML.entityMap
      //   );
      //   setMotivateionEditorState(EditorState.createWithContent(contentState));
      // }

      {
        const blocksFromHTML = convertFromHTML(recruitmentDetail.description);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setDescriptionEditorState(EditorState.createWithContent(contentState));
      }

      {
        const blocksFromHTML = convertFromHTML(recruitmentDetail.requirement);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setRequirementEditorState(EditorState.createWithContent(contentState));
      }

      {
        const blocksFromHTML = convertFromHTML(recruitmentDetail.welfare);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setWelfareEditorState(EditorState.createWithContent(contentState));
      }

      setDate(new Date(recruitmentDetail.expiredData));
      setAddress(recruitmentDetail.address);
      setMinExperience(recruitmentDetail.minExperience.toString());
      setMaxSalary(recruitmentDetail.maxSalary.toString());
    }
  }, [recruitmentDetail]);

  const onSubmit = () => {
    mutate({
      title: title,
      // motivation: convertToHTML(motivateionEditorState.getCurrentContent()),
      description: convertToHTML(descriptionEditorState.getCurrentContent()),
      requirement: convertToHTML(requirementEditorState.getCurrentContent()),
      welfare: convertToHTML(welfareEditorState.getCurrentContent()),
      address: concatAddress(provinceCode, districtCode, address),
      minExperience: parseInt(minExperience),
      maxSalary: parseInt(maxSalary),
      provinceId: parseInt(provinceCode),
      districtId: parseInt(districtCode),
      professionId: professionId,
    });
  };

  const {
    query: { data: professions },
  } = useGetProfessions({});

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
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề tuyển dụng *"
          />
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
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Địa chỉ làm việc"
          />
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
          <Label className="text-lg">Nghề nghiệp</Label>
          <Select
            value={professionId}
            onValueChange={(value) => setProfessionId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn 01 ngành nghề *" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {professions?.map((item) => (
                  <SelectItem value={item.id} key={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Kinh nghiệm tối thiểu</Label>
          <Input
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
            placeholder="Kinh nghiệm yêu cầu tối thiểu *"
            type="number"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Mức lương tối đa</Label>
          <Input
            value={maxSalary}
            onChange={(e) => setMaxSalary(e.target.value)}
            placeholder="Mức lương tối đa có thể trả *"
            type="number"
          />
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
            Bài tuyển dụng sẽ khả dụng đến hết ngày được chọn. Nếu không có giá
            trị, bài tuyển dụng sẽ được mở vĩnh viễn.
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button
          disabled={disabledCondition}
          onClick={onSubmit}
          loading={isPending}
          variant={"custom"}
        >
          {recruitmentId ? "Cập nhật" : "Tạo"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

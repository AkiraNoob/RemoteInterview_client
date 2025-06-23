"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // Use UUID to generate event IDs
import SelectDate from "~/components/schedule/_components/add-event-components/select-date";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useModal } from "~/context/modal-context";
import { useScheduler } from "~/context/schedular-provider";
import cookieCommons from "~/helpers/cookieCommon";
import useGetListRecruitmentOfAUser from "~/hook/useGetListRecruitmentOfAUser";
import { Event, EventFormData, eventSchema } from "~/types/index";
import { IMeetingListItemDTO } from "~/types/meeting.types";
import { RecruitmentStatusEnum } from "~/types/recruitment.types";
import InviteToMeetingForm from "../decorations/InviteToMeetingForm";

export default function AddEventModal({
  CustomAddEventModal,
  populatedData,
}: {
  CustomAddEventModal?: React.FC<{ register: any; errors: any }>;
  populatedData?: IMeetingListItemDTO;
}) {
  const { setClose, data } = useModal();

  const { handlers } = useScheduler();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: populatedData?.title ?? "",
      description: populatedData?.description ?? "",
      startDate: populatedData?.startTime
        ? new Date(populatedData.startTime)
        : new Date(),
      endDate: populatedData?.endTime
        ? new Date(populatedData.endTime)
        : new Date(),
      variant: "primary",
      color: "blue",
    },
  });

  const {
    query: { data: recruitments, isFetched },
  } = useGetListRecruitmentOfAUser({
    data: {
      employerId: cookieCommons.getUserId() as string,
      status: RecruitmentStatusEnum.Open,
      pageSize: 100,
    },
  });

  // Reset the form on initialization
  useEffect(() => {
    if (populatedData) {
      const eventData = populatedData;
      reset({
        title: eventData.title,
        description: eventData.description || "",
        startDate: populatedData?.startTime
          ? new Date(populatedData.startTime)
          : new Date(),
        endDate: populatedData?.endTime
          ? new Date(populatedData.endTime)
          : new Date(),
        variant: "primary",
        color: "blue",
      });
    }
  }, [populatedData, reset]);

  const onSubmit: SubmitHandler<EventFormData> = (formData) => {
    const newEvent: Event = {
      id: populatedData?.id || uuidv4(), // Generate a unique ID
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      variant: formData.variant,
      description: formData.description,
      recruitmentId: formData.recruitmentId,
    };

    if (!populatedData?.id) handlers.handleAddEvent(newEvent);
    else handlers.handleUpdateEvent(newEvent, populatedData.id);
    setClose(); // Close the modal after submission
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      {CustomAddEventModal ? (
        <CustomAddEventModal register={register} errors={errors} />
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input {...register("title")} placeholder="Tiêu đề cuộc họp *" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Mô tả</Label>
            <Input
              {...register("description")}
              placeholder="Mô tả lời mời cuộc họp"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Bài tuyển dụng</Label>
            {isFetched && (
              <Controller
                control={control}
                name="recruitmentId"
                render={({ field: { value, onChange } }) => (
                  <Select
                    defaultValue={value}
                    onValueChange={(value) => onChange(value)}
                  >
                    <SelectTrigger className={`w-full`}>
                      <SelectValue placeholder="Chọn một bài tuyển dụng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {recruitments?.data.map((item) => (
                          <SelectItem value={item.id}>{item.title}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            )}
          </div>

          <SelectDate
            data={{
              startDate: data?.default?.startDate || new Date(),
              endDate: data?.default?.endDate || new Date(),
            }}
            setValue={setValue}
          />

          {populatedData?.recruitmentId && (
            <InviteToMeetingForm
              recruitmentId={populatedData.recruitmentId}
              meetingId={populatedData.id}
            />
          )}

          <div className="flex justify-end space-x-2 mt-4 pt-2 border-t">
            <Button variant="outline" type="button" onClick={() => setClose()}>
              Huỷ
            </Button>
            <Button type="submit" variant={"custom"}>
              Lưu
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

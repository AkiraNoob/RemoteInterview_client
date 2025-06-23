"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { putRegisterCompanyRole, updateUserInfo } from "~/api/user";
import { PATH_NAME } from "~/constants/pathName";
import { imgAcceptTypeUpload } from "~/constants/type-upload";
import { province } from "~/data/province_data";
import cookieCommons from "~/helpers/cookieCommon";
import { cn } from "~/lib/utils";
import { IUpdateUserRequest } from "~/types/user.types";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combo-box";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

enum EUserRole {
  Employer = "employer",
  Employee = "employee",
}

export interface ICompleteProfileForm {
  fullName: string;
  phoneNumber: string;
  address: string;
  provinceId: string;
  districtId: string;
  taxNumber?: string;
  companyRegistrationImage?: FileList; // for file input
}

export default function OnboardingForm(
  props: ComponentPropsWithoutRef<"form">
) {
  const [role, setRole] = useState<EUserRole | undefined>(EUserRole.Employee);

  const navigation = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IUpdateUserRequest) => {
      const formdata = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formdata.append(key, value)
      );

      const userId = cookieCommons.getUserId() || "";
      await updateUserInfo(userId as string, formdata);
    },
    onSuccess(data, variables, context) {
      navigation.push(PATH_NAME.HOME);
    },
  });

  const { mutateAsync: registerCompany, isPending: isRegisteringCompany } =
    useMutation({
      mutationFn: async () => {
        const userId = cookieCommons.getUserId() || "";
        await putRegisterCompanyRole(userId as string);
      },
      onSuccess(data, variables, context) {
        navigation.push(PATH_NAME.RECRUITMENT);
      },
    });

  const { register, control, handleSubmit } = useForm<ICompleteProfileForm>();

  const watch = useWatch({
    control,
    name: "provinceId",
  });

  const onSubmit = async (data: ICompleteProfileForm) => {
    if (role === EUserRole.Employer) {
      await registerCompany();
      mutate({
        userId: cookieCommons.getUserId() as string,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        provinceId: parseInt(data.provinceId),
        districtId: parseInt(data.districtId),
        taxNumber: data.taxNumber,
        companyRegistrationImage: data.companyRegistrationImage?.[0],
      });
    } else {
      mutate({
        userId: cookieCommons.getUserId() as string,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        provinceId: parseInt(data.provinceId),
        districtId: parseInt(data.districtId),
      });
    }
  };

  return (
    <form
      {...props}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "space-y-10 border rounded-lg flex flex-col py-5 px-10 min-w-[800px] h-fit bg-white",
        props.className
      )}
    >
      <h3 className="text-center font-semibold text-3xl">
        Hoàn thiện hồ sơ của bạn
      </h3>
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <Label className="text-lg">Bạn là?</Label>
          <RadioGroup
            onValueChange={(value) => setRole(value as EUserRole)}
            defaultValue={EUserRole.Employee}
            className="flex gap-10"
          >
            <div className="flex  items-center gap-3">
              <RadioGroupItem value={EUserRole.Employee} id="r1" />
              <Label className="text-lg" htmlFor="r2">
                Người lao động
              </Label>
            </div>
            <div className="flex  items-center gap-3">
              <RadioGroupItem value={EUserRole.Employer} id="r2" />
              <Label className="text-lg" htmlFor="r3">
                Nhà tuyển dụng
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label className="text-lg">
            {role === EUserRole.Employee ? "Họ và tên" : "Tên công ty"}
          </Label>
          <Input
            {...register("fullName", {
              required: "Đây là trường bắt buộc",
            })}
            required
            placeholder={
              role === EUserRole.Employee
                ? "Nhập họ và tên đầy đủ *"
                : "Nhập tên công ty *"
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="text-lg">Số điện thoại</Label>
          <Input
            {...register("phoneNumber", { required: "Đây là trường bắt buộc" })}
            required
            placeholder={"Số điện thoại *"}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Địa chỉ</Label>
          <Input
            {...register("address", { required: "Đây là trường bắt buộc" })}
            required
            placeholder={"Địa chỉ cụ thể *"}
          />
          <div className="flex items-center gap-2 mt-2">
            <Controller
              control={control}
              name="provinceId"
              rules={{
                required:
                  "Đây là trường thông tin bắt buộc. Vui lòng không bỏ trống",
              }}
              render={({ field, fieldState: { error } }) => (
                <ComboBox
                  className="flex-1"
                  data={province.map((item) => ({
                    value: item.code.toString(),
                    label: item.name,
                  }))}
                  inputPlaceholder={"Tỉnh/ Thành phố"}
                  buttonPlaceholder={"Chọn tỉnh/ thành phố *"}
                  emptyText={""}
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              )}
            />

            <Controller
              control={control}
              name="districtId"
              rules={{
                required:
                  "Đây là trường thông tin bắt buộc. Vui lòng không bỏ trống",
              }}
              render={({ field, fieldState: { error }, formState }) => (
                <ComboBox
                  className="flex-1"
                  data={province
                    .find((item) => item.code.toString() === watch)
                    ?.districts?.map((item) => ({
                      value: item.code.toString(),
                      label: item.name,
                    }))}
                  inputPlaceholder={"Quận/ Huyện"}
                  buttonPlaceholder={"Chọn quận/ huyện *"}
                  emptyText={""}
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
        </div>
        {role === EUserRole.Employer && (
          <>
            <div className="space-y-2">
              <Label className="text-lg">Mã số thuế</Label>
              <Input
                {...register("taxNumber", {
                  required: "Đây là trường bắt buộc",
                })}
                placeholder={"Mã số thuế *"}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-lg">
                Hình ảnh giấy đăng kí doanh nghiệp
              </Label>
              <Input
                {...register("companyRegistrationImage", {
                  required: "Đây là trường bắt buộc",
                })}
                type="file"
                accept={imgAcceptTypeUpload.join(",")}
                placeholder={"Giấy đăng kí doanh nghiệp *"}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button
          loading={isPending || isRegisteringCompany}
          type="submit"
          variant={"custom"}
        >
          Xong
        </Button>
      </div>
    </form>
  );
}

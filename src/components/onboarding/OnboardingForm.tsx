"use client";

import { ComponentPropsWithoutRef, useContext, useState } from "react";
import { OnboardingContext } from "~/context/OnboardingContext";
import { province } from "~/data/province_data";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combo-box";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

enum EUserRole {
  Employer = "employer",
  Employee = "employee",
}

export default function OnboardingForm(props: ComponentPropsWithoutRef<"div">) {
  const [role, setRole] = useState<EUserRole | undefined>(EUserRole.Employee);
  const { provinceId, setProvinceId, districtId, setDistrictId } =
    useContext(OnboardingContext);

  return (
    <div
      {...props}
      className={cn(
        "space-y-10 border rounded-lg flex flex-col py-5 px-10 min-w-[800px] h-fit bg-white/50",
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
            placeholder={
              role === EUserRole.Employee
                ? "Nhập họ và tên đầy đủ"
                : "Nhập tên công ty"
            }
          />
        </div>
        <div className="space-y-2">
          <Label className="text-lg">Số điện thoại</Label>
          <Input placeholder={"Số điện thoại"} />
        </div>
        <div className="space-y-1">
          <Label className="text-lg">Địa chỉ</Label>
          <Input placeholder={"Địa chỉ cụ thể"} />
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
              value={provinceId}
              setValue={setProvinceId}
            />
            <ComboBox
              className="flex-1"
              data={province
                .find((item) => item.code.toString() === provinceId)
                ?.districts?.map((item) => ({
                  value: item.code.toString(),
                  label: item.name,
                }))}
              inputPlaceholder={"Quận/ Huyện"}
              buttonPlaceholder={"Chọn quận/ huyện"}
              emptyText={""}
              value={districtId}
              setValue={setDistrictId}
            />
          </div>
        </div>
        {role === EUserRole.Employer && (
          <>
            <div className="space-y-2">
              <Label className="text-lg">Mã số thuế</Label>
              <Input placeholder={"Mã số thuế"} />
            </div>

            <div className="space-y-2">
              <Label className="text-lg">
                Hình ảnh giấy đăng kí doanh nghiệp
              </Label>
              <Input type="file" placeholder={"Giấy đăng kí doanh nghiệp"} />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end items-center gap-4">
        <Button variant={"custom"} className="text-lg">
          Hoàn thiện
        </Button>
      </div>
    </div>
  );
}

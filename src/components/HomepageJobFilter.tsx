"use client";

import { Funnel } from "lucide-react";
import { useContext } from "react";
import { SearchContext } from "~/app/(layout_w_search_top_bar)/search/provider";
import { Experiences } from "~/constants/experiences";
import { province } from "~/data/province_data";
import { Button } from "./ui/button";
import { ComboBox } from "./ui/combo-box";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

const HomepageJobFilter = () => {
  const {
    minExperience,
    setMinExperience,
    maxSalary,
    setMaxSalary,
    minSalary,
    setMinSalary,
    provinceId,
    setProvinceId,
    districtId,
    setDistrictId,
  } = useContext(SearchContext);

  return (
    <div className="max-w-[300px] w-full space-y-2">
      <div className="flex gap-2 items-center">
        <Funnel size={20} fill="#fa4032" className="text-transparent" />
        <p className="text-xl font-semibold">Lọc nâng cao</p>
      </div>
      <Separator className="bg-other_divider" />
      <div className="space-y-2 pb-2">
        <p className="text-md font-semibold">Kinh nghiệm tối thiểu</p>
        <RadioGroup
          onValueChange={(value) => {
            setMinExperience(value);
          }}
          value={minExperience}
          defaultValue={Experiences["ALL"].value}
        >
          {Object.keys(Experiences).map((key, index) => (
            <div
              key={Experiences[key].value}
              className="flex items-center gap-3"
            >
              <RadioGroupItem
                value={Experiences[key].value}
                id={`exp_r_${index}`}
              />
              <Label className="font-normal" htmlFor={`exp_r_${index}`}>
                {Experiences[key].name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator className="bg-other_divider decoration-dashed" />
      <div className="space-y-2">
        <p className="text-md font-semibold">Mức lương</p>
        <div className="flex items-center gap-1">
          <Input
            maxLength={3}
            value={minSalary}
            onChange={(e) => {
              if (/^\d+$/.test(e.target.value) || !e.target.value) {
                setMinSalary(e.target.value);
              }
            }}
            placeholder="Từ"
          />
          <span> - </span>
          <Input
            maxLength={3}
            value={maxSalary}
            onChange={(e) => {
              if (/^\d+$/.test(e.target.value) || !e.target.value) {
                setMaxSalary(e.target.value);
              }
            }}
            placeholder="Đến"
          />
          <span className="text-sm"> triệu</span>
        </div>
        <Button variant={"custom"} className="w-full mb-2">
          Áp dụng
        </Button>
      </div>
      <Separator className="bg-other_divider" />

      <div className="space-y-2">
        <p className="text-md font-semibold">Vị trí</p>
        <ComboBox
          className="flex-1 w-full bg-transparent hover:bg-white/70"
          data={province.map((item) => ({
            value: item.code.toString(),
            label: item.name,
          }))}
          inputPlaceholder={"Tỉnh/ Thành phố"}
          buttonPlaceholder={"Chọn tỉnh/ thành phố *"}
          emptyText={""}
          value={provinceId}
          setValue={(value) => setProvinceId(value)}
        />

        <ComboBox
          className="flex-1 w-full bg-transparent hover:bg-white/70"
          data={province
            .find((item) => item.code.toString() === provinceId)
            ?.districts?.map((item) => ({
              value: item.code.toString(),
              label: item.name,
            }))}
          inputPlaceholder={"Quận/ Huyện"}
          buttonPlaceholder={"Chọn quận/ huyện *"}
          emptyText={""}
          value={districtId}
          setValue={(value) => setDistrictId(value)}
        />
      </div>
    </div>
  );
};

export default HomepageJobFilter;

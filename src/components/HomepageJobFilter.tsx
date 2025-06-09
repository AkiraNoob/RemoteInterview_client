"use client";

import { Funnel } from "lucide-react";
import { useState } from "react";
import { Experiences } from "~/constants/experiences";
import { JobType } from "~/constants/job-type";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";

const HomepageJobFilter = () => {
  const [minSalary, setMinSalary] = useState<string>("");
  const [maxSalary, setMaxSalary] = useState<string>("");

  return (
    <div className="max-w-[300px] w-full space-y-2">
      <div className="flex gap-2 items-center">
        <Funnel size={20} fill="#fa4032" className="text-transparent" />
        <p className="text-xl font-semibold">Lọc nâng cao</p>
      </div>
      <Separator className="bg-other_divider" />
      <div className="space-y-2 pb-2">
        <p className="text-md font-semibold">Kinh nghiệm tối thiểu</p>
        <RadioGroup defaultValue={Experiences["ALL"].value}>
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
        <p className="text-md font-semibold">Hình thức làm việc</p>
        <RadioGroup defaultValue={JobType["ALL"].value}>
          {Object.keys(JobType).map((key, index) => (
            <div key={JobType[key].value} className="flex items-center gap-3">
              <RadioGroupItem value={JobType[key].value} id={`jt_r_${index}`} />
              <Label className="font-normal" htmlFor={`jt_r_${index}`}>
                {JobType[key].name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default HomepageJobFilter;

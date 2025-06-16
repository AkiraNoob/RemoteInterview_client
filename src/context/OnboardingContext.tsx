"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface IOnboardingValue {
  fullName: string;
  address: string;
  provinceId: string;
  districtId: string;
  taxNumber: string;
  avatar: File | null;
  companyRegistrationImage: File | null;

  setFullName: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setProvinceId: Dispatch<SetStateAction<string>>;
  setDistrictId: Dispatch<SetStateAction<string>>;
  setTaxNumber: Dispatch<SetStateAction<string>>;
  setAvatar: Dispatch<SetStateAction<File | null>>;
  setCompanyRegistrationImage: Dispatch<SetStateAction<File | null>>;
}

export const OnboardingContext = createContext<IOnboardingValue>({
  fullName: "",
  address: "",
  provinceId: "",
  districtId: "",
  taxNumber: "",
  avatar: null,
  companyRegistrationImage: null,

  setFullName: () => {},
  setAddress: () => {},
  setProvinceId: () => {},
  setDistrictId: () => {},
  setTaxNumber: () => {},
  setAvatar: () => {},
  setCompanyRegistrationImage: () => {},
});

export default function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [companyRegistrationImage, setCompanyRegistrationImage] =
    useState<File | null>(null);

  return (
    <OnboardingContext.Provider
      value={{
        fullName,
        setFullName,
        address,
        setAddress,
        provinceId,
        setProvinceId,
        districtId,
        setDistrictId,
        taxNumber,
        setTaxNumber,
        avatar,
        setAvatar,
        companyRegistrationImage,
        setCompanyRegistrationImage,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

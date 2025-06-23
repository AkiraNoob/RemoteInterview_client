"use client";

import { useParams } from "next/navigation";
import { createContext } from "react";
import useRecruitmentDetail from "~/hook/useRecruitmentDetail";
import { IRecruitmentDTO } from "~/types/recruitment.types";

export const RecruitmentDetailContext = createContext<{
  data: IRecruitmentDTO | undefined;
}>({
  data: undefined,
});

export default function RecruitmentDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const recruitmentId = params?.jid;

  const {
    query: { data },
  } = useRecruitmentDetail({ recruitmentId: recruitmentId as string });

  return (
    <RecruitmentDetailContext.Provider
      value={{
        data: data,
      }}
    >
      {children}
    </RecruitmentDetailContext.Provider>
  );
}

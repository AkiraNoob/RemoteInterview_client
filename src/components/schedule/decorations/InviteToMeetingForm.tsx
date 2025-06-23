import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import useGetApplyingForARecruitment from "~/hook/useGetApplyingForARecruitment";
import useInviteUserToMeeting from "~/hook/useInviteUserToMeeting";
import { UserRecruitmentStatusEnum } from "~/types/recruitment.types";

export default function InviteToMeetingForm({
  recruitmentId,
  meetingId,
}: {
  recruitmentId: string;
  meetingId: string;
}) {
  const {
    query: { data },
  } = useGetApplyingForARecruitment({
    data: {
      status: UserRecruitmentStatusEnum.Approved,
      recruitmentId: recruitmentId as string,
      pageSize: 100,
    },
  });

  const {
    mutation: { mutate },
  } = useInviteUserToMeeting({});

  const [userId, setUserId] = useState("");

  return (
    <div className="flex flex-col gap-2 items-end">
      <Select value={userId} onValueChange={(value) => setUserId(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn một ứng viên" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.data.map((item) => (
              <SelectItem value={item.userId}>
                {item.user.fullName} - {item.user.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={() =>
          mutate({
            userId: userId,
            meetingId: meetingId,
          })
        }
        variant={"custom"}
      >
        Mời
      </Button>
    </div>
  );
}

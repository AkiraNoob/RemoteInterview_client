"use client";

import { SchedulerProvider } from "~/context/schedular-provider";
import { useCreateMeeting, useUpdateMeeting } from "~/hook/useMutateMeeting";

export default function DecoratedSchedularProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    mutation: { mutate: createMeetingMutate },
  } = useCreateMeeting({});

  const {
    mutation: { mutate: updateMeetingMutate },
  } = useUpdateMeeting({});

  return (
    <SchedulerProvider
      onAddEvent={(event) =>
        createMeetingMutate({
          startTime: event.startDate.toISOString(),
          endTime: event.endDate.toISOString(),
          recruitmentId: event.recruitmentId,
          visitorIds: [],
          description: event.description,
          title: event.title,
        })
      }
      onUpdateEvent={(event) =>
        updateMeetingMutate({
          startTime: event.startDate.toISOString(),
          endTime: event.endDate.toISOString(),
          meetingId: event.id,
          description: event.description,
          title: event.title,
        })
      }
      weekStartsOn="monday"
    >
      {children}
    </SchedulerProvider>
  );
}

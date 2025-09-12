"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdViewHeader from "../components/MeetingIdViewHeader";
import { useRouter } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { toast } from "sonner";
import { useConfirm } from "@/modules/agents/hooks/useConfirm";
import UpdateMeetingDialog from "../components/UpdateMeetingDialog";
import UpcomingState from "../components/UpcomingState";
import ActiveState from "../components/ActiveState";
import CancelledState from "../components/CancelledState";
import ProcessingState from "../components/ProcessingState";

interface Props {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  console.log(data);

  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isActive = data.status === "active";
  const isProcessing = data.status === "processing";

  /////////////////////////////////// remove meeting /////////////////////////////////

  const handleRemoveMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.replace("/meetings");
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
          return;
        }
        toast.error("Something went wrong");
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this agent?",
    `The following can remove ${data.name} meetings`
  );

  const handleRemoveConfirmation = async () => {
    const ok = await confirmRemove();
    if (ok) {
      handleRemoveMeeting.mutateAsync({ id: meetingId });
    }
    return;
  };

  ///////////////////////////// update meeting /////////////////////////////////

  const [openUpdateMeetingDialog, setOpenUpdateMeetingDialog] = useState(false);

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={openUpdateMeetingDialog}
        onOpenChange={setOpenUpdateMeetingDialog}
        meeting={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          onEdit={() => setOpenUpdateMeetingDialog(true)}
          onRemove={handleRemoveConfirmation}
          meetingName={data.name}
          meetingId={data.id}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancellingMeeting={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed Meeting View</div>}
        {isCancelled && <CancelledState />}
      </div>
    </>
  );
};

export default MeetingIdView;

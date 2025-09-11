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
      <UpdateMeetingDialog open={openUpdateMeetingDialog} onOpenChange={setOpenUpdateMeetingDialog} meeting={data}  />
      <MeetingIdViewHeader
        onEdit={() => setOpenUpdateMeetingDialog(true)}
        onRemove={handleRemoveConfirmation}
        meetingName={data.name}
        meetingId={data.id}
      />
    </>
  );
};

export default MeetingIdView;

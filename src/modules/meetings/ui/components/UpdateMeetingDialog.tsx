import ResponsiveDialog from "@/components/ResponsiveDialog";
import React from "react";
import { MeetingGetOne } from "../../types";
import MeetingForm from "./MeetingForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting: MeetingGetOne;
}

const UpdateMeetingDialog = ({ open, onOpenChange, meeting }: Props) => {
  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Create Agent"
        description="Create a new agent"
      >
        <MeetingForm
          initialValues={meeting}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default UpdateMeetingDialog;

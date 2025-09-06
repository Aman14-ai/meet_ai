import ResponsiveDialog from "@/components/ResponsiveDialog";
import React from "react";
import MeetingForm from "./MeetingForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MeetingDialog = ({open , onOpenChange}: Props) => {
  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Create New Meeting"
        description="Create a new meeting to solve your tasks"
      >
        <MeetingForm
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default MeetingDialog;

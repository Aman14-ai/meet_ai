import ResponsiveDialog from "@/components/ResponsiveDialog";
import React from "react";
import AgentForm from "./AgentForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateAgentDialog = ({ open, onOpenChange }: Props) => {
  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Create Agent"
        description="Create a new agent"
      >
        <AgentForm
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default CreateAgentDialog;

import ResponsiveDialog from "@/components/ResponsiveDialog";
import React from "react";
import AgentForm from "./AgentForm";
import { AgentGetOne } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AgentGetOne;
}

const UpdateAgentDialog = ({ open, onOpenChange, agent }: Props) => {
  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Create Agent"
        description="Create a new agent"
      >
        <AgentForm
          initialValues={agent}
          onCancel={() => onOpenChange(false)}
          onSuccess={() => onOpenChange(false)}
        />
      </ResponsiveDialog>
    </div>
  );
};

export default UpdateAgentDialog;

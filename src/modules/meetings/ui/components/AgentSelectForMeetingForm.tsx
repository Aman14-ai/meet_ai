"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import CreateAgentDialog from "@/modules/agents/ui/components/CreateAgentDialog";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const AgentSelectForMeetingForm: React.FC<Props> = ({ value, onChange }) => {
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.agents.getMany.queryOptions({}));
  const itemsArr = data?.items || [];

  return (
    <>
    <CreateAgentDialog open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-auto rounded-md border border-border">
          <SelectValue placeholder="Select Your Agent" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 p-1 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading agents...
            </div>
          ) : itemsArr.length === 0 ? (
            <div className="p-4 flex items-center justify-center text-sm text-gray-500">
              <span>No agents found</span>
              <Button
              onClick={() => setOpenNewAgentDialog(true)}
                variant="link"
                className="ml-2 p-0 text-blue-600 hover:text-blue-800"
              >
                Create one?
              </Button>
            </div>
          ) : (
            itemsArr.map((agent) => (
              <SelectItem
                key={agent.id}
                value={agent.id}
                className="cursor-pointer text-sm hover:bg-gray-100"
              >
                {agent.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </>
  );
};

export default AgentSelectForMeetingForm;

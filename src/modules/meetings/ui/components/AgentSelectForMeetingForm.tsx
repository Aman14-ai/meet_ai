import React from "react";
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

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const AgentSelectForMeetingForm: React.FC<Props> = ({ value, onChange }) => {
  const trpc = useTRPC();
  const { data , isLoading } = useQuery(trpc.agents.getMany.queryOptions({}));
  const itemsArr = data?.items || [];

  return (
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
          <div className="p-3 text-center text-sm text-gray-500">
            No agents found
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
  );
};

export default AgentSelectForMeetingForm;

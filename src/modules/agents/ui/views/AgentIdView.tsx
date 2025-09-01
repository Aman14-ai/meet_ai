"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import AgentIdViewHeader from "../components/AgentIdViewHeader";
import { User2, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  agentId: string;
}

const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {
          console.log("To do edit");
        }}
        onRemove={() => {
          console.log("To do remove");
        }}
      />

      <div className="bg-background rounded-lg border border-border">
        <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 gap-y-4 sm:gap-y-5 flex flex-col col-span-5">
          {/* Header with user icon and name */}
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            <User2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <Link
              className="max-w-[220px] font-bold sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] 
               truncate text-xl"
              href={`/agents/${agentId}`}
            >
              {data.name}
            </Link>
          </div>

          {/* Meeting badge */}
          <Badge
            variant="outline"
            className="flex items-center gap-x-1.5 sm:gap-x-2 [&>svg]:size-3 sm:[&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" />
            <span className="text-sm font-normal opacity-80">
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </span>
          </Badge>

          {/* Instructions section */}
          <div className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4">
            <p className="text-sm sm:text-base font-medium">Instructions</p>
            <p className="text-sm text-muted-foreground sm:text-base">
              {data.instruction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentIdView;

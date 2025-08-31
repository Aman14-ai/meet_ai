"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "../components/DataTable";
import { columns } from "../components/columns";
import EmptyState from "@/components/EmptyState";

const AgentViews = () => {
  const trpc = useTRPC();
  //   const { data , isLoading , isError } = useQuery(trpc.agents.getMany.queryOptions()); this is for client fetching for getting data from hydration boundary use useSuspenseQuery
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // it has already data so no use of isLoading

  return (
    <>
      <div className="text-xl flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 font-normal max-w-screen p-2">
        <DataTable data={data} columns={columns} />
        {data.length === 0 && (
          <EmptyState
            title="No Agents"
            description="No Agents Found. Please try to create an agent.  "
          />
        )}
      </div>
    </>
  );
};

export default AgentViews;

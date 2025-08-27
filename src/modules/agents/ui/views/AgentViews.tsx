"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const AgentViews = () => {
  const trpc = useTRPC();
  //   const { data , isLoading , isError } = useQuery(trpc.agents.getMany.queryOptions()); this is for client fetching for getting data from hydration boundary use useSuspenseQuery
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // it has already data so no use of isLoading

  return (
    <>
      <div className="text-2xl font-normal">
        Data : {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};

export default AgentViews;

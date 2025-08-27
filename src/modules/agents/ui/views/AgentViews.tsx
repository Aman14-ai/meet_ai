"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
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
        <ResponsiveDialog
          title="test"
          description="this is test "
          open
          onOpenChange={() => console.log("test")}
        >
          <Button>Some Action</Button>
        </ResponsiveDialog>
        Data : {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
};

export default AgentViews;

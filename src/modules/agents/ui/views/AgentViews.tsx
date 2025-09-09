"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import EmptyState from "@/components/EmptyState";
import { useAgentFilters } from "../../hooks/AgentFilterHooks";
import DataPagination from "../components/DataPagination";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";

const AgentViews = () => {
  const [filter, setFilter] = useAgentFilters();
  const trpc = useTRPC();
  //   const { data , isLoading , isError } = useQuery(trpc.agents.getMany.queryOptions()); this is for client fetching for getting data from hydration boundary use useSuspenseQuery
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filter })
  );
  // it has already data so no use of isLoading
  const router = useRouter();

  return (
    <>
      <div className="text-xl flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 font-normal max-w-screen p-2">
        <DataTable
          title="Agents"
          onRowClick={(data) => router.push(`/agents/${data.id}`)}
          data={data.items}
          columns={columns}
        />
        <DataPagination
          page={filter.page}
          onPageChange={(page?: number) => setFilter({ page })}
          totalPages={data.totalPages}
        />
        {data.items.length === 0 && (
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

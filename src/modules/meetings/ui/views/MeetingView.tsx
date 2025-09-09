"use client";
import { DataTable } from "@/components/DataTable";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import EmptyState from "@/components/EmptyState";
import { useMeetingFilters } from "../../hooks/MeetingFilterHooks";
import DataPagination from "@/modules/agents/ui/components/DataPagination";

const MeetingView = () => {
  const [filter, setFilter] = useMeetingFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({...filter}));
  console.log(data);

  return (
    <>
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable title="Meetings" data={data.items} columns={columns} />
        {data.items.length == 0 && (
          <EmptyState
            title="No Meetings"
            description="Create a new meetings to collaborate with others and share your ideas"
          />
        )}
        {data.items.length > 0 && (
          <DataPagination
            page={filter.page}
            onPageChange={(page?: number) => setFilter({ page })}
            totalPages={data.totalPages}
          />
        )}
      </div>
    </>
  );
};

export default MeetingView;

"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircle } from "lucide-react";
import React, { useState } from "react";
import CreateAgentDialog from "./CreateAgentDialog";
import { useAgentFilters } from "../../hooks/AgentFilterHooks";
import AgentSearchFilter from "./AgentSearchFilter";
import { DEFAULT_PAGE } from "@/constants";

const ListHeaders = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useAgentFilters();
  const isFilterNotNull = !!filter.search;
  const onClear = () => {
    setFilter({ search: "", page: DEFAULT_PAGE });
  };

  return (
    <>
      <CreateAgentDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setOpen((prev) => !prev)} variant={"default"}>
            <PlusIcon /> Create New
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentSearchFilter />
          {isFilterNotNull && (
            <Button
              onClick={onClear}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-sm text-muted-foreground hover: transition-all duration-300 ease-in-out hover:scale-105 "
            >
              <XCircle className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline">reset</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default ListHeaders;

"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircle } from "lucide-react";
import React, { useState } from "react";
import MeetingDialog from "./MeetingDialog";
import MeetingSearchFilter from "./MeetingSearchFilter";
import { useMeetingFilters } from "../../hooks/MeetingFilterHooks";

const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);

  const [filter, setFilter] = useMeetingFilters();
  const isFilterNotNull = !!filter.search;
  const onClear = () => {
    setFilter({ search: "", page: 1 });
  };

  return (
    <>
      <MeetingDialog open={open} onOpenChange={setOpen} />
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setOpen(true)} variant={"default"}>
            <PlusIcon /> New Meeting
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <MeetingSearchFilter />
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

export default MeetingsListHeader;

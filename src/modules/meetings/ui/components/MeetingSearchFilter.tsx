"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { useMeetingFilters } from "../../hooks/MeetingFilterHooks";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  LoaderIcon,
  SearchIcon,
} from "lucide-react";

import AgentSelectForMeetingForm from "./AgentSelectForMeetingForm";

const MeetingSearchFilter = () => {
  const statusOptions = [
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Active", value: "active" },
    { label: "Processing", value: "processing" },
  ];

  const statusIconMap = {
    completed: CircleCheckIcon,
    cancelled: CircleXIcon,
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    processing: ClockFadingIcon,
  };
  const [filter, setFilter] = useMeetingFilters();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
      {/* Search Input */}
      <div className="relative w-full md:w-[200px]">
        <Input
          placeholder="filter by name"
          className="h-9 bg-background pl-7 w-full"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
        />
        <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Agent + Status on mobile as one row */}
      <div className="flex justify-between items-center gap-2 w-full md:flex md:w-auto md:gap-3">
        <Select
          onValueChange={(e) => setFilter({ status: e })}
          value={filter.status}
        >
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {statusOptions.map((status) => {
                const StatusIcon =
                  statusIconMap[status.value as keyof typeof statusIconMap];
                return (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="cursor-pointer text-sm hover:bg-gray-100 flex items-center gap-2"
                  >
                    <StatusIcon className="size-4 text-muted-foreground" />
                    {status.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <AgentSelectForMeetingForm
          value={filter.agentId}
          onChange={(e) => setFilter({ agentId: e })}
        />
      </div>
    </div>
  );
};

export default MeetingSearchFilter;

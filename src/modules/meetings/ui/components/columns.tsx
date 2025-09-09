"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import {
  CornerDownRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    round: true,
    largest: 1,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  completed: CircleCheckIcon,
  cancelled: CircleXIcon,
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  processing: ClockFadingIcon,
};

const statusColorMap = {
  completed: "text-emerald-700 bg-emerald-100 border-emerald-300",   // ✅ bright green, clean
  cancelled: "text-red-700 bg-red-100 border-red-300",               // ❌ strong red
  upcoming: "text-blue-700 bg-blue-100 border-blue-300",             // 📅 optimistic blue
  active: "text-indigo-700 bg-indigo-100 border-indigo-300",         // 🔥 vivid indigo
  processing: "text-amber-700 bg-amber-100 border-amber-300",        // ⚙️ warm amber
};


export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          <span className="font-semibold capitalize">{row.original.name}</span>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <CornerDownRightIcon className="size-3 text-muted-foreground" />
              <span className="text-muted-foreground text-sm max-w-[200px] truncate capitalize">
                {row.original.agent.name}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {row.original.startedAt
                ? format(row.original.startedAt, "MMM d")
                : "--"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const StatusIcon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];
      const statusColor =
        statusColorMap[row.original.status as keyof typeof statusColorMap];
      return (
        <Badge
          variant={"outline"}
          className={`text-muted-foreground capitalize [&>svg]:size-4 rounded-full border ${statusColor}`}
        >
          <StatusIcon
            className={cn(
              row.original.status === "processing" ? "animate-spin" : ""
            )}
          />
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <Badge
          variant={"outline"}
          className="text-muted-foreground rounded-full border [&>svg]:size-4"
        >
          <ClockFadingIcon className="size-4 text-blue-700" />
          {row.original.duration
            ? formatDuration(row.original.duration as number)
            : "No Duration"}
        </Badge>
      );
    },
  },
];

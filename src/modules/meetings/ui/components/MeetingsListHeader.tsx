"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import MeetingDialog from "./MeetingDialog";

const MeetingsListHeader = () => {
  const [open, setOpen] = useState(false);

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
      </div>
    </>
  );
};

export default MeetingsListHeader;

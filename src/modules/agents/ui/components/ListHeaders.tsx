"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import CreateAgentDialog from "./CreateAgentDialog";

const ListHeaders = () => {
  const [open, setOpen] = useState(false);

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
      </div>
    </>
  );
};

export default ListHeaders;

"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

const MeetingView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  console.log(data);

  return (
    <div className="flex flex-col items-center max-w-screen justify-center mt-10 gap-5">
      Meeting page
      <hr />
      <div className="w-full max-w-4xl overflow-x-auto bg-background p-4 rounded-lg">
        <pre className="whitespace-pre-wrap break-words text-sm">
          Data is: {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default MeetingView;

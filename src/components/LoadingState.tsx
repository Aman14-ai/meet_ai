import { Loader2Icon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="min-h-screen bg-muted py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-card backdrop-blur-sm bg-opacity-95 rounded-xl p-10 shadow-lg border border-border transform transition-all duration-300 hover:shadow-xl">
        <Loader2Icon className="animate-spin text-indigo-600 size-8 transition-transform duration-700 ease-in-out" />
        <div className="flex flex-col gap-3 text-center">
          <h6 className="text-xl font-semibold text-normal tracking-tight">
            {title}
          </h6>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;

import { AlertCircleIcon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const ErrorState = ({ title, description }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-white backdrop-blur-sm bg-opacity-95 rounded-xl p-10 shadow-lg border border-slate-100 transform transition-all duration-300 hover:shadow-xl">
        <AlertCircleIcon className=" text-destructive size-8 transition-transform duration-700 ease-in-out" />
        <div className="flex flex-col gap-3 text-center">
          <h6 className="text-xl font-semibold text-slate-800 tracking-tight">
            {title}
          </h6>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default ErrorState;

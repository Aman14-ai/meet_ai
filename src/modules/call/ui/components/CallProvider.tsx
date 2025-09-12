import { authClient } from "@/lib/auth-client";
import { LoaderIcon } from "lucide-react";
import React from "react";
import CallConnect from "./CallConnect";
import { generatedAvatarUrl } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen justify-center items-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generatedAvatarUrl({ seed: data.user.name, variant: "initials" })
      }
    />
  );
};

export default CallProvider;

"use client";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function HomeView() {
  const { data: session } = authClient.useSession();

  const trpc = useTRPC();
  const {data} = useQuery(trpc.agents.getMany.queryOptions({}));;

  if(!session)
  {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex  overflow-x-scroll items-center max-w-screen justify-center mt-10 flex-col gap-5">
      Home page
      <hr />
      Data is: {JSON.stringify(data)}
    </div>
  );
}

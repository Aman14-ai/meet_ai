import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import AgentViews from "@/modules/agents/ui/views/AgentViews";
import ListHeaders from "@/modules/agents/ui/components/ListHeaders";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs";
import { loadSearchParms } from "@/modules/agents/params";

// instead of fetching data in client components it will better to fetched in server side and provide in cache.

interface Props {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: Props) => {
  const filter = await loadSearchParms(searchParams);
  console.log("\n\nRadhe Radhe", filter);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filter })
  );

  // NOTE: queryOptions should be matched in both client side and server side otherwise it looses the headers

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <ListHeaders />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Agents"
              description="This may takes few Seconds"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error while fetching agents"
                description="Something went wrong. Please try again later."
              />
            }
          >
            <div className="bg-muted">
              <AgentViews />
            </div>
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;

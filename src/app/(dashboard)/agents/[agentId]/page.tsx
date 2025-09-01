import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import AgentIdView from "@/modules/agents/ui/views/AgentIdView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ agentId: string }>;
}

const page = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading Agent" description="This may takes few Seconds" />}>
        <ErrorBoundary
          fallback={<ErrorState title="Error Loading Agent" description="Something went wrong. Please try again later" />}
        >
            <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;

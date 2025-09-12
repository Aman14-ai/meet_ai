import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { auth } from "@/lib/auth";
import CallView from "@/modules/call/ui/views/CallView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ meetingId: string }>;
}

const page = async ({ params }: Props) => {
  /////////////////////////////////////////////////////////////////////////////////////
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Call"
            description="This may take a few seconds."
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Something went wrong"
              description="Please try again later"
            />
          }
        >
          <CallView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;

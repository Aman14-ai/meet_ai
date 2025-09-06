"use client";
import React from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { MeetingInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TRPCError } from "@trpc/server";
import { MeetingGetOne } from "../../types";
import AgentSelectForMeetingForm from "./AgentSelectForMeetingForm";

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
};

const AgentForm = ({ onCancel, onSuccess, initialValues }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        onSuccess?.();
        toast.success("Meeting created successfully");
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
          return;
        }
        toast.error("Something went wrong");
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
        toast.success("Meeting updated successfully");
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
        }
        toast.error("Something went wrong.");
      },
    })
  );

  const form = useForm<z.infer<typeof MeetingInsertSchema>>({
    resolver: zodResolver(MeetingInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof MeetingInsertSchema>) => {
    console.log(values);
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues?.id ?? "" });
      return;
    }
    createMeeting.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-6 bg-card rounded-lg shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-primary">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-full px-4 bg-input py-2 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />
        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-primary">
                Select Your Agent
              </FormLabel>
              <FormControl>
                <AgentSelectForMeetingForm {...field} />
              </FormControl>
              <FormMessage className="text-red-500 text-xs mt-1" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-3 pt-4  ">
          {onCancel && (
            <Button
              disabled={isPending}
              variant={"ghost"}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : isEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;

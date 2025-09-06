import z from "zod";

export const MeetingInsertSchema = z.object({
  name: z.string().min(1, { message: "Meeting name is required" }),
  agentId: z.string().min(1, { message: "Agent is required" }),
});

export const MeetingUpdateSchema = MeetingInsertSchema.extend({
  id: z.string().min(1, { message: "Meeting id is required" }),
});

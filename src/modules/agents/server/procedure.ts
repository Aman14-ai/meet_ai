import { db } from "@/db";
import { z } from "zod";
import { agent } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  // TODO : getMany as protectedProcedure

  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agent);
    return data;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agent)
        .where(eq(agent.id, input.id));
      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agent)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
      return createdAgent;
    }),
});

// get all agents api in a fully type safe.

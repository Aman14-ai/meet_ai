import { db } from "@/db";
import { z } from "zod";
import { agent } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";

export const agentsRouter = createTRPCRouter({

  getMany: protectedProcedure
    .input(
      z
        .object({
          page: z.number().default(DEFAULT_PAGE),
          pageSize: z
            .number()
            .min(MIN_PAGE_SIZE)
            .max(MAX_PAGE_SIZE)
            .default(DEFAULT_PAGE_SIZE),
          search: z.string().nullish(),
        })
        .optional()
    )
    .query(async ({ctx , input}) => {
      const data = await db
        .select({ meetingCount: sql<number>`1`, ...getTableColumns(agent) })
        .from(agent).where(and(eq(agent.userId , ctx.session.user.id)));
      return data;
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({ meetingCount: sql<number>`1`, ...getTableColumns(agent) })
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

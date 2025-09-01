import { db } from "@/db";
import { z } from "zod";
import { agent } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { search, page, pageSize } = input;
      const data = await db
        .select({ meetingCount: sql<number>`5`, ...getTableColumns(agent) })
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(agent.createdAt), desc(agent.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(agent)
        .where(
          and(
            eq(agent.userId, ctx.session.user.id),
            search ? ilike(agent.name, `%${search}%`) : undefined
          )
        );

      const totalPages = Math.ceil((total[0]?.count ?? 0) / pageSize);
      return {
        items: data,
        total: total[0]?.count ?? 0,
        totalPages,
      };
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [existingAgent] = await db
        .select({ meetingCount: sql<number>`1`, ...getTableColumns(agent) })
        .from(agent)
        .where(
          and(eq(agent.id, input.id), eq(agent.userId, ctx.session.user.id))
        );

      if (!existingAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
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

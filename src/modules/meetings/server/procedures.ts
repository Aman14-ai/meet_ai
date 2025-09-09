import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { db } from "@/db";
import { agent, meeting } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import z from "zod";
import { MeetingInsertSchema, MeetingUpdateSchema } from "../schema";

export const meetingsRouter = createTRPCRouter({
  // Define procedures here

  create: protectedProcedure
    .input(MeetingInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const [createdMeeting] = await db
        .insert(meeting)
        .values({ ...input, userId: ctx.session.user.id })
        .returning();

      // TODO: create stream call

      return createdMeeting;
    }),

  update: protectedProcedure
    .input(MeetingUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const [updatedMeeting] = await db
        .update(meeting)
        .set(input)
        .where(
          and(eq(meeting.id, input.id), eq(meeting.userId, ctx.session.user.id))
        )
        .returning();

      if (!updatedMeeting)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      return updatedMeeting;
    }),

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
        .select({
          ...getTableColumns(meeting),
          agent: agent,
          duration: sql`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration"),
        })
        .from(meeting)
        .innerJoin(agent, eq(agent.id, meeting.agentId))
        .where(
          and(
            eq(meeting.userId, ctx.session.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(meeting.createdAt), desc(meeting.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(meeting)
        .innerJoin(agent, eq(agent.id, meeting.agentId))
        .where(
          and(
            eq(meeting.userId, ctx.session.user.id),
            search ? ilike(meeting.name, `%${search}%`) : undefined
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
      const [existingMeeting] = await db
        .select({ ...getTableColumns(meeting) })
        .from(meeting)
        .where(
          and(eq(meeting.id, input.id), eq(meeting.userId, ctx.session.user.id))
        );

      if (!existingMeeting)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      return existingMeeting;
    }),
});

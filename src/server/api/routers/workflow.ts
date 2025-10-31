import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { inngest } from "@/lib/inngest";
import { workflow } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const workflowRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ workflowId: z.uuid("Invalid workflow ID format") }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(workflow)
        .where(
          and(
            eq(workflow.id, input.workflowId),
            eq(workflow.userId, ctx.session.user.id)
          )
        )
        .limit(1);

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Workflow not found or you don't have permission to access it",
        });
      }

      return data;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(workflow)
      .where(and(eq(workflow.userId, ctx.session.user.id)));

    return data;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(1, "Workflow name is required")
          .max(255, "Workflow name must be less than 255 characters")
          .trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .insert(workflow)
        .values({
          name: input.name,
          userId: ctx.session.user.id,
        })
        .returning();

      if (!data) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create workflow",
        });
      }

      return data;
    }),
  delete: protectedProcedure
    .input(z.object({ workflowId: z.uuid("Invalid workflow ID format") }))
    .mutation(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .delete(workflow)
        .where(
          and(
            eq(workflow.id, input.workflowId),
            eq(workflow.userId, ctx.session.user.id)
          )
        )
        .returning();

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Workflow not found or you don't have permission to delete it",
        });
      }

      return data;
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        workflowId: z.uuid("Invalid workflow ID format"),
        workflowNewName: z
          .string()
          .min(1, "Workflow name is required")
          .max(255, "Workflow name must be less than 255 characters")
          .trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .update(workflow)
        .set({ name: input.workflowNewName })
        .where(
          and(
            eq(workflow.id, input.workflowId),
            eq(workflow.userId, ctx.session.user.id)
          )
        )
        .returning();

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Workflow not found or you don't have permission to update it",
        });
      }

      return data;
    }),
  test: publicProcedure.mutation(async ({ ctx, input }) => {
    const workflow = await inngest.send({
      name: "execute/ai",
    });

    return { success: true, message: "Job queued" };
  }),
});

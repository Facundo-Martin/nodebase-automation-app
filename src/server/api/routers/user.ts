import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users as usersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ userId: z.uuid() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, input.userId));

      return users;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.select().from(usersTable);

    return users;
  }),
  generateText: publicProcedure.mutation(async () => {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });
    console.log("Generated text:", text);
    return text;
  }),
});

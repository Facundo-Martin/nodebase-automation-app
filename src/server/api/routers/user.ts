import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { posts, users as usersTable } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ userId: z.int() }))
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
});

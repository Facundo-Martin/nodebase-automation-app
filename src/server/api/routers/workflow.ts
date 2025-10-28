import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { inngest } from "@/lib/inngest";

export const workflowRouter = createTRPCRouter({
  test: publicProcedure.mutation(async ({ ctx, input }) => {
    const workflow = await inngest.send({
      name: "test/hello.world",
      data: {
        email: "testemail@gmail.com",
      },
    });

    return workflow;
  }),
});

import { inngest } from "@/lib/inngest";
import { db } from "../db";
import { workflows } from "../db/schema";

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    await step.run("create-workflow", async () => {
      return await db
        .insert(workflows)
        .values({ name: "test-worflow", authorId: crypto.randomUUID() });
    });
    return { message: `Hello ${event.data.email}!` };
  }
);

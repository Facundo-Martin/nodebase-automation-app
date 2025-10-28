import { inngest } from "@/lib/inngest";
import { db } from "../db";
import { workflows } from "../db/schema";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    // const { text } = await generateText({
    //   model: google("gemini-2.5-flash"),
    //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
    // });
    // console.log("Generated text:", text);

    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are a helpful assistant",
      prompt: "What is 2 + 2?",
    });

    // await step.sleep("wait-a-moment", "1s");
    // await step.run("create-workflow", async () => {
    //   return await db
    //     .insert(workflows)
    //     .values({ name: "test-worflow", authorId: crypto.randomUUID() });
    // });
    // return { message: `Hello ${event.data.email}!` };
  }
);

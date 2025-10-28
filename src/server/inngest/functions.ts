import { inngest } from "@/lib/inngest";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    // const { text } = await generateText({
    //   model: google("gemini-2.5-flash"),
    //   prompt: "Write a vegetarian lasagna recipe for 4 people.",
    // });
    // console.log("Generated text:", text);

    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      }
    );

    const { steps: openaiSteps } = await step.ai.wrap(
      "openai-generate-text",
      generateText,
      {
        model: openai("gpt-4"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      }
    );

    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-5"),
        system: "You are a helpful assistant",
        prompt: "What is 2 + 2?",
      }
    );

    return { geminiSteps, openaiSteps, anthropicSteps };

    // await step.sleep("wait-a-moment", "1s");
    // await step.run("create-workflow", async () => {
    //   return await db
    //     .insert(workflows)
    //     .values({ name: "test-worflow", authorId: crypto.randomUUID() });
    // });
    // return { message: `Hello ${event.data.email}!` };
  }
);

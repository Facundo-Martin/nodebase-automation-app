import { inngest } from "@/lib/inngest";
import { execute } from "@/server/inngest/functions";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [execute],
});

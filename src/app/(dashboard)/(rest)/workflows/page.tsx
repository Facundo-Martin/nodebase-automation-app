import { auth } from "@/lib/auth-server";
import { api, HydrateClient } from "@/trpc/server";
import { RenderWorkflows } from "./_components/render-workflows";

export default async function Page() {
  await auth.api.protectRoute();
  void api.workflow.getMany.prefetch();

  return (
    <HydrateClient>
      <div>
        <h1>Workflows</h1>
        <p>Has premium access: we don't know</p>
      </div>
      <RenderWorkflows />
    </HydrateClient>
  );
}

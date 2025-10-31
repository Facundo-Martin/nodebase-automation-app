"use client";
import { api } from "@/trpc/react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function RenderWorkflows() {
  const [data] = api.workflow.getMany.useSuspenseQuery();

  return (
    <ErrorBoundary fallbackRender={() => null}>
      <Suspense fallback={null}>
        <div>
          <p>Rendering workflows: {JSON.stringify(data)}</p>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

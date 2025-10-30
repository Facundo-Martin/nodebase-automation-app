import { auth } from "@/lib/auth-server";

export default async function Page() {
  await auth.api.protectRoute();

  return (
    <div>
      <h1>Workflows</h1>
      <p>Has premium access: we don't know</p>
    </div>
  );
}

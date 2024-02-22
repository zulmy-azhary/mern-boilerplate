import { getCurrentUser } from "@/services/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage
});

function ProfilePage() {
  const user = getCurrentUser();

  return (
    <>
      <h1>Profile Page</h1>
      <p>Hi {user?.name}</p>
    </>
  );
}

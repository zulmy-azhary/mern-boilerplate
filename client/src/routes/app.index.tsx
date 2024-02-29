import { useDocumentTitle } from "@/hooks/document-title";
import { useCurrentUser } from "@/services/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: HomePage
});

function HomePage() {
  useDocumentTitle("Dashboard");
  const user = useCurrentUser();
  return (
    <div className="space-y-6">
      <div className="">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p>Welcome back, {user?.name}!</p>
      </div>
    </div>
  );
}

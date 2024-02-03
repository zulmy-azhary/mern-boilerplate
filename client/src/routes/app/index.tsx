import { useAuthStore } from "@/store/auth.store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: HomePage
});

function HomePage() {
  const { isAuthenticated } = useAuthStore(state => state);
  return (
    <>
      isAuthenticated: {isAuthenticated ? "true" : "false"}
      <p>Home page</p>
    </>
  );
}

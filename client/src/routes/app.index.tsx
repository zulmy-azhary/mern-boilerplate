import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: HomePage
});

function HomePage() {
  return (
    <>
      <p>Home page</p>
    </>
  );
}

import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/app"
      });
    }
  }
});

function AuthLayout() {
  return (
    <div className="flex h-full min-h-screen justify-center">
      <main className="flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}

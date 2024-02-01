import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
  notFoundComponent: NotFoundComponent
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
function NotFoundComponent() {
  return <div>Not found on Auth Layout</div>;
}

import { Toaster } from "@/components/ui/sonner";
import type { Auth } from "@/lib/auth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: RootComponent,
  beforeLoad: () => {}
});

function RootComponent() {
  return (
    <>
      <Toaster richColors theme="light" />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

import { Toaster } from "@/components/ui/sonner";
import type { AuthStore } from "@/store/auth.store";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient; auth: AuthStore }>()({
  component: RootComponent
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

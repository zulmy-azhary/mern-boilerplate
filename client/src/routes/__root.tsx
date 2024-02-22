import { Toaster } from "@/components/ui/sonner";
import type { AuthStore } from "@/store/auth.store";
import { type QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthStore;
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster richColors theme="light" />
      <TanStackRouterDevtools />
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-white py-16 md:items-center">
      <div className="mx-auto flex max-w-xl flex-col lg:max-w-4xl lg:flex-row">
        <div className="relative border-gray-100 px-5 lg:border-r-2">
          <p className="absolute -top-3 left-10 text-base font-bold uppercase text-indigo-600 md:left-20 md:top-0 md:text-4xl">
            Error
          </p>
          <p className="md:text-10xl text-7xl font-extrabold tracking-wider text-gray-700">404</p>
        </div>

        <div className="px-5">
          <p className="text-3xl font-bold tracking-wide text-gray-700 md:text-5xl">Page Not Found</p>
          <p className="mt-4 text-sm font-medium text-gray-500 md:text-base">
            The content you’re looking for doesn’t exist. Either it was removed, or you mistyped the link. <br />
            <br />
            Sorry about that! Please visit our homepage to get where you need to go.
          </p>
          <Link
            to="/"
            className="relative mt-10 inline-flex items-center rounded border border-transparent bg-indigo-600 px-7 py-3.5 font-medium text-white hover:bg-indigo-700 md:text-lg"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}

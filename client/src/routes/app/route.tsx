import { auth } from "@/lib/auth";
import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: LayoutComponent,
  notFoundComponent: NotFoundComponent,
  beforeLoad: ({ context, location }) => {
    if (context.auth.status === "logout") {
      throw redirect({
        to: "/"
      });
    }

    return {
      email: auth.email
    };
  }
});

function LayoutComponent() {
  return (
    <div>
      <h1>App</h1>
      <Outlet />
      <Link to="/">Logout</Link>
    </div>
  );
}

function NotFoundComponent() {
  return <div>Not found on App Layout</div>;
}

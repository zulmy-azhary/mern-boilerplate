import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { Outlet, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: LayoutComponent,
  notFoundComponent: NotFoundComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/"
      });
    }
  }
});

function LayoutComponent() {
  const { setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate({ to: "/" });
  };

  return (
    <div>
      <h1>App</h1>
      <Outlet />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

function NotFoundComponent() {
  return <div>Not found on App Layout</div>;
}

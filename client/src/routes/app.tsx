import { me } from "@/api/user";
import { Navbar } from "@/components/ui/navbar";
import { useAuthStore } from "@/store/auth.store";
import type { ResponseError } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app")({
  component: ProtectedLayout,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login"
      });
    }
  }
});

function ProtectedLayout() {
  const { logout: setLogout } = useAuthStore();
  const navigate = useNavigate();
  const { error, isLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: me
  });

  useEffect(() => {
    if (error) {
      setLogout();
      if ((error as AxiosError<ResponseError>).response) {
        toast.error((error as AxiosError<ResponseError>).response?.data.error.message);
      } else {
        toast.error(error.message);
      }
      navigate({ to: "/login" });
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

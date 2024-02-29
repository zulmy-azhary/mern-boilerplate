import { me } from "@/api/user";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { useMediaQuery } from "@/hooks/media-query";
import { useToggle } from "@/hooks/toggle";
import { cn } from "@/lib/utils";
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
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const { isOpen, setOpen, onToggle } = useToggle(true);
  const { logout: setLogout } = useAuthStore();
  const navigate = useNavigate();
  const { error, isLoading, data } = useQuery({
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
  }, [error, data]);

  useEffect(() => {
    setOpen(!!isLaptop);
  }, [isLaptop]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar isOpen={isOpen} setOpen={setOpen} isLaptop={isLaptop} />
      <main
        className={cn(
          "flex min-h-screen flex-col gap-y-5 px-8 pb-12 after:fixed after:backdrop-blur-sm after:duration-500",
          isLaptop ? "ml-[300px]" : "ml-[0px]",
          isOpen && !isLaptop ? "after:bg-foreground/30 after:inset-0" : "after:bg-transparent"
        )}
      >
        <Navbar isLaptop={isLaptop} onToggle={onToggle} />
        <section className="grid gap-y-16">
          <Outlet />
        </section>
      </main>
    </>
  );
}

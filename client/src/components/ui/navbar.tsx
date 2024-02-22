import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/api/auth";
import type { AxiosError, AxiosResponse } from "axios";
import type { Response, ResponseError } from "@/types/api";
import { toast } from "sonner";

export const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { logout: setLogout } = useAuthStore();

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["user", "logout"],
    mutationFn: logout,
    onSuccess: (res: AxiosResponse<Response>) => {
      setLogout();
      navigate({ to: "/login" });
      return toast.success(res.data.message);
    },
    onError: (res: AxiosError<ResponseError>) => {
      if (res.response) {
        return toast.error(res.response.data.error.message);
      }
      return toast.error(res.message);
    }
  });

  const handleLogout = () => {
    mutateLogout();
  };

  return (
    <header className="body-font mb-4 w-full bg-gray-800 text-gray-100 shadow-sm">
      <div className="mx-auto flex items-center justify-between gap-x-8 px-3 py-3">
        <Link to="/app" className="text-xl font-semibold text-gray-100 antialiased">
          MERN
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-fit gap-x-2 rounded-none p-0 hover:bg-inherit hover:bg-opacity-25 hover:text-gray-300 focus-visible:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Avatar>
                <AvatarFallback>
                  <PersonIcon className="h-10 text-black" />
                </AvatarFallback>
              </Avatar>
              <p>{user?.name}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-col gap-y-2 py-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>
                    <PersonIcon className="h-12 w-12 text-black" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-sm">{user?.email}</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/app/profile">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button onClick={handleLogout} className="flex w-full justify-between">
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

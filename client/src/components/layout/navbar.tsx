import { Link, useNavigate } from "@tanstack/react-router";
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
import { useCurrentUser } from "@/services/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LuUser2 } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/api/auth";
import type { AxiosError, AxiosResponse } from "axios";
import type { Response, ResponseError } from "@/types/api";
import { toast } from "sonner";
import { IoMenu } from "react-icons/io5";

type NavbarProps = {
  isLaptop: boolean;
  onToggle: () => void;
};

export const Navbar = (props: NavbarProps) => {
  const { isLaptop, onToggle } = props;
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { logout: setLogout } = useAuthStore();

  const { mutate: mutateLogout } = useMutation({
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
    <header className="body-font w-full py-4">
      <nav className="flex items-center justify-between gap-x-8">
        {!isLaptop ? (
          <Button onClick={onToggle} size="icon" variant="ghost">
            <IoMenu size={24} />
          </Button>
        ) : null}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-auto flex h-fit gap-x-2 rounded-none p-0 hover:bg-inherit hover:text-gray-600 focus-visible:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Avatar className="border-border border">
                <AvatarFallback>
                  <LuUser2 className="size-5" />
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
                <Avatar className="border-border size-24 border">
                  <AvatarFallback>
                    <LuUser2 className="size-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-sm">{user?.email}</p>
                  <p className="text-xs">{user?.role}</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/app/account">
                  Account
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
      </nav>
    </header>
  );
};

import { cn } from "@/lib/utils";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { IconType } from "react-icons/lib";

type NavLinkProps = LinkProps & {
  icon: IconType;
  children: React.ReactNode;
};

export const NavLink = (props: NavLinkProps) => {
  const { icon: Icon, children, ...rest } = props;
  return (
    <Link
      {...rest}
      className="flex items-center gap-x-4 rounded p-2 font-medium"
      activeProps={{
        className: "bg-blue-500/30 text-blue-500"
      }}
    >
      {({ isActive }) => (
        <>
          <div
            className={cn(
              "rounded border-[1.6px] p-2 shadow-md shadow-gray-200 dark:shadow-gray-900",
              isActive && "border-blue-500 bg-blue-500 shadow-none"
            )}
          >
            <Icon className={cn("text-lg", isActive && "text-white")} />
          </div>
          <span className="text-sm font-semibold">{children}</span>
        </>
      )}
    </Link>
  );
};

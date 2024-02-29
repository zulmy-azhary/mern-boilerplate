import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoClose, IoGrid } from "react-icons/io5";
import { NavLink } from "@/components/ui/nav-link";
import { FaUserGear } from "react-icons/fa6";
import { useOnClickOutside } from "@/hooks/click-outside";
import { useCallback } from "react";

type SidebarProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLaptop: boolean;
};

export const Sidebar = (props: SidebarProps) => {
  const { isOpen, setOpen, isLaptop } = props;
  const onClosed = useCallback(() => !isLaptop && setOpen(false), [isLaptop]);
  const sidebarRef = useOnClickOutside(isOpen, onClosed);
  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "bg-background fixed inset-y-0 z-10 flex min-h-screen w-[300px] flex-col justify-between overflow-hidden px-6 pb-6 transition-all duration-500",
        isOpen ? "left-0" : "-left-full"
      )}
    >
      <div className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between py-7">
          <h1 className="text-2xl font-bold uppercase tracking-widest">Mern</h1>
          {!isLaptop && (
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <IoClose size={24} />
            </Button>
          )}
        </div>
        <ul className="flex flex-col gap-y-2 font-medium tracking-wide">
          <h3 className="mb-2 text-xs font-bold uppercase">Menu</h3>
          <NavLink onClick={onClosed} to="/app" icon={IoGrid} activeOptions={{ exact: true }}>
            Dashboard
          </NavLink>
          <NavLink onClick={onClosed} to="/app/account" icon={FaUserGear}>
            Account
          </NavLink>
        </ul>
      </div>
    </aside>
  );
};

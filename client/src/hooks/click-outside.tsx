import { type MutableRefObject, useEffect, useRef } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
  state: boolean,
  handler: () => void
): MutableRefObject<T | null> => {
  const menuRef = useRef<T | null>(null);

  useEffect(() => {
    if (!state) return;
    const handleEvent = (e: MouseEvent): void => {
      if (!menuRef.current?.contains(e.target as T) && state) handler();
    };

    // When user press esc key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };

    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [state, handler]);

  return menuRef;
};

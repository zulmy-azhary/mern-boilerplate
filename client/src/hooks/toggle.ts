import { useCallback, useState } from "react";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useToggle = (defaultValue?: boolean): Props => {
  const [isOpen, setOpen] = useState<boolean>(!!defaultValue);
  const onToggle = useCallback(() => setOpen(value => !value), []);
  return { isOpen, onToggle, setOpen };
};

import { useEffect, useState } from "react";

const SIDEBAR_STATE_KEY = 'sidebar-expanded';

type SidebarState = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useSidebarState(): SidebarState {
  const [expanded, setExpanded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    return storedState ? JSON.parse(storedState) : true;
  }
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(expanded));
  }, [expanded]);

  return { expanded, setExpanded }; 
}

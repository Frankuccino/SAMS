import { useEffect, useState } from "react";

const SIDEBAR_STATE_KEY = 'sidebar-expanded';

type SidebarState = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useSidebarState(): SidebarState {
  
  const storedState = window?.localStorage?.getItem(SIDEBAR_STATE_KEY);
  const initialExpanded = storedState ? JSON.parse(storedState) : true;

  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  useEffect(() => {
    window?.localStorage?.setItem(SIDEBAR_STATE_KEY, JSON.stringify(expanded));
  }, [expanded]);

  return { expanded, setExpanded }; 
}

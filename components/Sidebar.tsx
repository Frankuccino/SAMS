"use client"
/* eslint-disable @next/next/no-img-element */
import { useContext, createContext, useState, useEffect } from "react";
import { ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";
import { useSidebarState } from "../utils/useSidebarState";
import Link from "next/link";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar?: () => void;
};


const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  
  // const { expanded, setExpanded } = useSidebarState();
  const [expanded, setExpanded] = useState(false)

  
  const toggleSidebar = () => {
    setExpanded((current) => !current);
  };

  return (
    <aside className="relative left-0 top-0 z-[5] h-full rounded-r-3xl bg-primary">
      <nav className="flex h-full flex-col">
      <div className={`relative flex justify-end p-3 ${expanded ? 'items-center' : ''}`}>
        {expanded && (
          <img
            src="https://www.spud.edu.ph/assets/logo/spud_logo.png"
            className={`contain absolute inset-0 m-auto mt-4 h-[80px] w-[80px] overflow-hidden transition-all`}
            alt=""
          />
        )}
        <button
          onClick={toggleSidebar}
          className="m-1 rounded-xl bg-yellow-200 p-2 text-black hover:bg-yellow-300"
        >
          {expanded ? <ChevronsLeft /> : <ChevronsRight />}
        </button>
      </div>


        <SidebarContext.Provider value={{ isOpen: expanded }}>
          <ul className="mt-10 flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* <div className="flex border-t p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-md"
          />
          <div
            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-black">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} className='text-black'/>
          </div>
        </div> */}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, link }: any) {
  const { isOpen }: any = useContext(SidebarContext);

  return (
    <Link href={link ? link : ''}>
    <li
      className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors
        ${
          active
            ? "bg-gradient-to-t from-green-700 to-green-800 text-gray-50"
            : "text-gray-700 hover:bg-green-600"
        }
      `}
    >
      {icon}

      <span
        className={`overflow-hidden transition-all ${
          isOpen ? "ml-6 w-52" : "w-0"
        }`}
      >
        {text} 
      </span>

      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-red-400 ${
            isOpen ? "" : "top-2"
          }`}
        />
      )}

      {!isOpen && (
        <div
          className={`
            invisible absolute left-full ml-6 -translate-x-10 rounded-md
            bg-green-100 px-2 py-1
            text-sm text-green-800 opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
          `
        }
        >
          {text}
        </div>
      )}
    </li>
    </Link>
  );
}

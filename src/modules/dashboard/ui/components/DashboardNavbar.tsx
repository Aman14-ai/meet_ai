"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelLeftOpen, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardCommand from "./DashboardCommand";

const DashboardNavbar = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    // this attach the down function to the global  document
    return () => document.removeEventListener("keydown", down);
    // when the component unmounts remove the event listener
  }, []);

  return (
    <>
      <DashboardCommand
        commandOpen={commandOpen}
        setCommandOpen={setCommandOpen}
      />
      <nav className="flex bg-background px-4 py-2 gap-x-2 border-b">
        <Button onClick={() => toggleSidebar()} variant={"outline"} size={"sm"}>
          {state == "collapsed" || isMobile ? (
            <PanelLeftOpen />
          ) : (
            <PanelLeftClose />
          )}
        </Button>
        <Button
          className="h-9 cursor-text w-[240px] justify-start font-normalhover:text-muted-foreground text-muted-foreground"
          variant={"outline"}
          onClick={() => {
            setCommandOpen((prev) => !prev);
          }}
          size={"sm"}
        >
          <SearchIcon />
          <span className="ml-2">Search</span>
          <kbd className="ml-auto text-xs bg-muted font-normal rounded border px-1.5 py-1 inline-flex select-none h-5 items-center gap-1 pointer-events-none font-mono text-[10px]">
            <span>&#8984;</span>k
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;

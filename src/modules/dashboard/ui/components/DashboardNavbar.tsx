"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  SearchIcon,
  Sun,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardCommand from "./DashboardCommand";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const DashboardNavbar = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  const { setTheme } = useTheme();

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
      <nav className="flex justify-between bg-background px-4 py-3 gap-x-2 border-b">
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => toggleSidebar()}
            variant={"outline"}
            size={"sm"}
          >
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
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default DashboardNavbar;

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import React, { Dispatch } from "react";

type Props = {
  commandOpen: boolean;
  setCommandOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DashboardCommand = ({ commandOpen, setCommandOpen }: Props) => {
  return (
    <CommandDialog
      open={commandOpen}
      onOpenChange={setCommandOpen}
      className="rounded-lg border shadow-md md:min-w-[450px]"
    >
      <CommandInput placeholder="Type a command or Search" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Docs</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;

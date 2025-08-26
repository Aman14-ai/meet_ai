"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BotIcon, ChevronUp, StarIcon, User2, VideoIcon } from "lucide-react";

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

const DashboardSidebar = () => {
  const { data: session } = authClient.useSession();
  console.log(session);
  const router = useRouter();

  const pathname = usePathname();
  return (
    <Sidebar className="w-64  flex flex-col h-screen shadow-lg">
      {/* Header */}
      <Link href="/">
        <SidebarHeader className="text-2xl font-bold px-4 py-5 ">
          Meet Ai
        </SidebarHeader>
      </Link>

      {/* Divider */}
      <Separator />

      {/* Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto mt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full rounded-md px-3 py-2  ",
                      pathname === item.href &&
                        "bg-gray-800 text-white transition-colors duration-200"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full rounded-md px-3 py-2  ",
                      pathname === item.href &&
                        "bg-gray-800 text-white transition-colors duration-200"
                    )}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mb-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full  flex items-center space-x-2 px-3 py-2  rounded-md ">
                  {/* User Avatar */}
                  {session?.user.image ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={session.user.image}
                        width={40}
                        height={40}
                        alt="User Image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <User2 className="w-10 h-10 text-gray-400" />
                  )}

                  {/* User Info */}
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-sm font-semibold truncate">
                      {session?.user.name || "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-400 truncate">
                      {session?.user.email || "No email"}
                    </span>
                  </div>

                  {/* Chevron Icon */}
                  <ChevronUp className="ml-auto w-4 h-4 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <button
                    onClick={() => {
                      authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => router.push("/sign-in"),
                        },
                      });
                    }}
                  >
                    Sign out
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

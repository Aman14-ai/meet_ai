import { auth } from "@/lib/auth";
import SigninView from "@/modules/auth/ui/views/SigninView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!!session)
  {
    redirect("/");
  }
  return (
    <SigninView />
  );
};

export default page;

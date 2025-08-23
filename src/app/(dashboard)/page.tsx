import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/HomeView";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async() => {

  const session = await auth.api.getSession({
    headers: await headers(),

  });
  console.log(session)
  if(!session)
  {
    redirect("/sign-in");
  }

  return <HomeView />;
};
export default page;

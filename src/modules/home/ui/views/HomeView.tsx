"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if(!session)
  {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center mt-10 flex-col gap-5">
      <div>
        Logged in as {session?.user?.name} :{session?.user?.email}
      </div>
      <div>
        <Button className="cursor-pointer" onClick={() => authClient.signOut({fetchOptions: {
            onSuccess: () => router.push("/sign-in")
        }})}>Logout</Button>
      </div>
    </div>
  );
}

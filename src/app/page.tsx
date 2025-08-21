"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const {data: session} = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      {
        onError: () => {
          alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("success");
        },
      }
    );
    console.log(data);
    console.log(error);
  };

  if(session)
  {
    console.log("Radhe Radhe")
    console.log(session);
    return (
      <div className="mt-5">
        <h1 className="text-center font-bold">Logged In as {session.user.name}</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center flex-col space-y-3 justify-center max-w-md mt-5 border border-pink-500 rounded-2xl p-3 bg-pink-100">
        <Input
          className="bg-gray-100 text-black"
          placeholder="Enter your name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="bg-gray-100 text-black"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="bg-gray-100 text-black"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} variant={"default"} className=" m-5 ">
          Submit
        </Button>
      </div>
    </div>
  );
}

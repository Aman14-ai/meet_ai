"use client";
import React, { useState } from "react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { OctagonAlertIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const SigninView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            console.log("Signin success");
          },
          onError: (error) => {
            console.log("Signin error");
            setError(error.error.message);
          },
        }
      );
    } catch (error) {
      console.log("Error while signin in frontend in catch block , ", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    setLoading(true);
    const { email, password } = values;
    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onError: (error) => {
            console.log("Signin error");
            setError(error.error.message);
          },
          onSuccess: () => {
            console.log("Signin success");
            router.push("/");
          },
        }
      );
    } catch (error) {
      console.log("Error while signin in frontend in catch block , ", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl sm:text-2xl font-bold"> 
            Login to your account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
          <div className="text-blue-600 pt-2 text-xs sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {!!error && (
                <Alert className="bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 text-xs sm:text-sm">
                  <OctagonAlertIcon className="w-4 h-4" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <Button
                disabled={loading}
                type="submit"
                className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
              >
                Login
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <hr className="border-foreground" />
            <span className="absolute inset-0 flex justify-center -top-3">
              <span className="bg-background px-2 text-xs sm:text-sm text-muted-foreground">
                or continue with
              </span>
            </span>
          </div>

          {/* Social login buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button
              disabled={loading}
              onClick={handleGoogleLogin}
              variant="outline"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <FcGoogle className="size-5" />
              <span className="text-muted-foreground">sign in with Google</span>
            </Button>
          </div>

          <p className="mt-6 text-center text-[10px] sm:text-xs text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninView;

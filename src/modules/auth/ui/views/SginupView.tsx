"use client";
import React, { useState } from "react";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { OctagonAlertIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const SignupView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/",
        },
        {
          onError: (error) => {
            console.log("Signin error");
            setError(error.error.message);
          },
          onSuccess: () => {
            console.log("Signin success");
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
    const { name, email, password } = values;
    try {
      await authClient.signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onError: (error) => {
            console.log("Signup error");
            setError(error.error.message);
          },
          onSuccess: () => {
            console.log("Signup success");
            router.push("/");
          },
        }
      );
    } catch (error) {
      console.log("Error while signup in frontend in catch block , ", error);
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
            Create your account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
          <div className="text-blue-600 pt-2 text-xs sm:text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="text-sm sm:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Email */}
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

              {/* Password */}
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

              {/* Error alert */}
              {!!error && (
                <Alert className="bg-red-50 text-red-700 border border-red-200 flex items-center gap-2 text-xs sm:text-sm">
                  <OctagonAlertIcon className="w-4 h-4" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              {/* Submit button */}
              <Button
                disabled={loading}
                type="submit"
                className="w-full rounded-lg text-sm sm:text-base py-2 sm:py-3"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-6">
            <hr className="border-gray-300" />
            <span className="absolute inset-0 flex justify-center -top-3">
              <span className="bg-background px-2 text-xs sm:text-sm text-muted-foreground">
                or continue with
              </span>
            </span>
          </div>

          {/* Social login */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button
              disabled={loading}
              onClick={handleGoogle}
              variant="outline"
              className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-2 sm:py-3 text-xs sm:text-sm"
            >
              <FcGoogle className="size-5" />
              <span className="text-muted-foreground">sign up with Google</span>
            </Button>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            By signing up, you agree to our{" "}
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

export default SignupView;

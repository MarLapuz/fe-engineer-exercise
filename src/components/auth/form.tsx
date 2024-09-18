"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { authenticate } from "@/app/api/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AuthenticateRequest, AuthenticateSchema, AuthUser } from "@/lib/definitions";
import { useRouter } from "next/navigation";

import { useLocalStorage } from "@uidotdev/usehooks";

export default function AuthForm() {
  const [_, setAuthUser] = useLocalStorage<AuthUser>(
    "authUser",
  );
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<AuthenticateRequest>({
    resolver: zodResolver(AuthenticateSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const [activeTab, setActiveTab] = useState("signin");

  const onSubmit = handleSubmit(async (data) => {
    const { name, email } = data;

    try {
   const response =   await authenticate({
        name,
        email,
      });

      if (response) {
      setAuthUser({
        name,
        email
      });

      toast({
        title: `Welcome ${name}!`,
        description: "You have successfully signed in.",
      });

      router.push("/");
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error signing in. Please try again.",
        variant: "destructive",
      });
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Sign in to your account or create a new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="text-left">
            <Form {...form}>
              <form onSubmit={onSubmit} noValidate>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            required
                            placeholder="Enter your name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            required
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmit(e);
                    }}
                  >
                    Login
                    {isSubmitting ? (
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="signup" className="text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  placeholder="Enter your name"
                  required
                  type="text"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  placeholder="Enter your email"
                  required
                  type="email"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-email">Confirm Email</Label>
                <Input
                  id="confirm-email"
                  placeholder="Confirm your email"
                  required
                  type="email"
                  disabled
                />
              </div>
              <Button className="w-full" disabled>
                Sign Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

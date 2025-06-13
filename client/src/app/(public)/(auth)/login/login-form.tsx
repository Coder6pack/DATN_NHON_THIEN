"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/app/queries/useAuth";
import { toast } from "@/hooks/use-toast";
import { handleHttpErrorApi } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginBodySchema, LoginBodyType } from "@/schemaValidations/auth.model";
import { useAppContext } from "@/components/app-provider";
import { useEffect } from "react";

export default function LoginForm() {
  const loginMutation = useLoginMutation();
  const searchParams = useSearchParams()
  const clearTokens = searchParams.get('clearTokens')
  const { setIsAuth } = useAppContext()
  const route = useRouter();
  useEffect(() => {
    if (clearTokens) {
      setIsAuth(false)
    }
  }, [clearTokens, setIsAuth])
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodySchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return;
    try {
      if (loginMutation.isPending) return;
      const result = await loginMutation.mutateAsync(data);
      toast({
        description: "Login successfully",
      });
      setIsAuth(true)
      route.push("/manage/dashboard");
    } catch (error) {
      handleHttpErrorApi({ error, setError: form.setError });
    }
  };

  return (
    <Card className="mx-auto max-w-sm bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Đăng nhập</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log(errors);
            })}
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white">
                Đăng nhập
              </Button>
              <Button variant="outline" className="w-full text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" type="button">
                Đăng nhập bằng Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

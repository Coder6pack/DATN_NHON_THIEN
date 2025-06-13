import LoginForm from "@/app/(public)/(auth)/login/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

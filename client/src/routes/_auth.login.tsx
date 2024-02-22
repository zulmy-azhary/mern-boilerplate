import { CardWrapper } from "@/components/auth/card-wrapper";
import { loginSchema } from "@/schemas/auth.schema";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { toast } from "sonner";
import type { AxiosResponse, AxiosError } from "axios";
import type { Response, ResponseError } from "@/types/api";
import { useAuthStore } from "@/store/auth.store";

export const Route = createFileRoute("/_auth/login")({
  component: LoginPage
});

function LoginPage() {
  const { setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (res: AxiosResponse<Response>) => {
      setIsAuthenticated(true);
      navigate({ to: "/app" });
      return toast.success(res.data.message);
    },
    onError: (res: AxiosError<ResponseError>) => {
      if (res.response) {
        return toast.error(res.response.data.error.message);
      }
      return toast.error(res.message);
    }
  });

  const handleSubmit = form.handleSubmit(values => {
    mutateLogin(values);
  });

  return (
    <CardWrapper
      headerTitle="Login"
      headerDescription="Welcome back! Please fill out the form below before logging in to the website."
      backButtonLabel="Don't have an account? Register"
      backButtonHref="/register"
      className="p-2"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="email"
              label="Email Address"
              type="email"
              placeholder="e.g. johndoe@example.com"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}

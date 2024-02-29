import { register } from "@/api/auth";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useDocumentTitle } from "@/hooks/document-title";
import { registerSchema } from "@/schemas/auth.schema";
import type { Response, ResponseError } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export const Route = createFileRoute("/_auth/register")({
  component: RegisterPage
});

function RegisterPage() {
  useDocumentTitle("Register");
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "User"
    }
  });

  const { mutate: mutateRegister, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (res: AxiosResponse<Response>) => {
      form.reset();
      navigate({ to: "/" });
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
    mutateRegister(values);
  });

  return (
    <CardWrapper
      headerTitle="Register"
      headerDescription="Register your account by filling out the form below, make sure the data you enter is correct."
      backButtonLabel="Already have an account? Login"
      backButtonHref="/"
      className="p-2"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              type="text"
              placeholder="e.g. John Doe"
              isPending={isPending}
            />
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
            <FormInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="******"
              isPending={isPending}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

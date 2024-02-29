import { useCurrentUser } from "@/services/user";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { accountSchema } from "@/schemas/user.schema";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccount } from "@/api/user";
import type { AxiosError, AxiosResponse } from "axios";
import type { Response, ResponseError } from "@/types/api";
import { toast } from "sonner";
import { FormSelect } from "@/components/auth/form-select";
import { SelectItem } from "@/components/ui/select";
import { LuUser2 } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDocumentTitle } from "@/hooks/document-title";
import { useState } from "react";

export const Route = createFileRoute("/app/account")({
  component: ProfilePage
});

function ProfilePage() {
  useDocumentTitle("Account");
  const user = useCurrentUser()!;
  const queryClient = useQueryClient();
  const [isEditable, setEditable] = useState(false);
  const form = useForm<z.infer<typeof accountSchema>>({
    mode: "onChange",
    resolver: zodResolver(accountSchema),
    values: {
      name: user.name,
      email: user.email,
      password: undefined,
      newPassword: undefined,
      role: user.role
    }
  });

  const { mutate: mutateUpdateAccount, isPending } = useMutation({
    mutationFn: updateAccount,
    onSuccess: (res: AxiosResponse<Response>) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setEditable(false);
      return toast.success(res.data.message);
    },
    onError: (res: AxiosError<ResponseError>) => {
      if (res.response) {
        return toast.error(res.response?.data.error.message);
      }
      return toast.error(res.message);
    }
  });

  const handleCancel = () => {
    form.reset();
    setEditable(false);
  };

  const handleSubmit = form.handleSubmit(values => {
    mutateUpdateAccount({ ...values, _id: user._id });
  });

  return (
    <div className="space-y-6">
      <div className="">
        <h2 className="text-2xl font-semibold">Account</h2>
        <p>Manage your account settings</p>
      </div>
      <div className="grid grid-cols-7 place-items-center gap-y-6">
        <Avatar className="border-border col-span-full size-60 place-items-center self-start border md:col-span-3 lg:col-span-full xl:col-span-3 xl:size-80">
          <AvatarFallback>
            <LuUser2 className="size-24 xl:size-40" />
          </AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className="col-span-full w-full space-y-6 md:col-span-4 lg:col-span-full xl:col-span-4"
          >
            <div className="space-y-4">
              <FormInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="e.g. John Doe"
                isPending={isPending}
                disabled={!isEditable}
              />
              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                type="email"
                placeholder="e.g. johndoe@example.com"
                isPending={isPending}
                disabled={!isEditable}
                readOnly
              />
              <FormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="******"
                isPending={isPending}
                disabled={!isEditable}
              />
              <FormInput
                control={form.control}
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="******"
                isPending={isPending}
                disabled={!isEditable}
              />
              <FormSelect control={form.control} name="role" label="Role" isPending={isPending} disabled={!isEditable}>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </FormSelect>
            </div>
            {isEditable ? (
              <div className="flex justify-end gap-x-4">
                <Button type="button" variant="destructive" onClick={handleCancel} disabled={isPending}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={isPending}>
                  Update account
                </Button>
              </div>
            ) : (
              <Button type="button" className="w-full" onClick={() => setEditable(true)}>
                Change user account
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

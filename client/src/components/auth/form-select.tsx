import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type FormSelectProps<T extends FieldValues> = React.ComponentPropsWithRef<"button"> & {
  control: Control<T>;
  name: Path<T>;
  label: React.ReactNode;
  isPending?: boolean;
  placeholder?: React.ComponentProps<"input">["placeholder"];
};

export const FormSelect = <T extends FieldValues>(props: FormSelectProps<T>) => {
  const { control, name, label, isPending, disabled, children, placeholder, ...rest } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={cn(fieldState.error && "border-red-500")}
                disabled={isPending || disabled}
                {...rest}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>{children}</SelectContent>
            </Select>
          </FormControl>
          <FormMessage className="!mt-0 text-xs" />
        </FormItem>
      )}
    />
  );
};

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef } from "react";

const TextField = (props: TProps) => {
  const { name, label, value, onBlur, onChange, errors, ariaInvalid, ...rest } = props;

  return (
    <Field data-invalid={ariaInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type="text"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        {...rest}
      />
      {ariaInvalid && <FieldError errors={errors} />}
    </Field>
  );
};

export default TextField;

type TProps = {
  label: string;
  name: string;
  value: string;
  errors: Array<{ message?: string } | undefined>;
  ariaInvalid: boolean;
} & ComponentPropsWithoutRef<"input">;

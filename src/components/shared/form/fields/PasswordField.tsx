import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef } from "react";

const PasswordField = (props: TProps) => {
  const {
    name,
    label,
    value,
    onBlur,
    onChange,
    errors,
    required,
    ariaInvalid,
    placeholder,
    autoComplete,
    ...rest
  } = props;

  return (
    <Field data-invalid={ariaInvalid}>
      <FieldLabel htmlFor={name}>{label ?? "Password"}</FieldLabel>
      <Input
        id={name}
        type="password"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        placeholder={placeholder ?? "Enter your password"}
        autoComplete={autoComplete}
        required={required ?? false}
        {...rest}
      />
      {ariaInvalid && <FieldError errors={errors} />}
    </Field>
  );
};

export default PasswordField;

type TProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  name: string;
  value: string;
  errors: Array<{ message?: string } | undefined>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ariaInvalid: boolean;
  placeholder?: string;
  autoComplete: "off" | "new-password" | "current-password";
  required?: boolean;
};

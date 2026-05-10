import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const EmailField = (props: TProps) => {
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
  } = props;

  return (
    <Field data-invalid={ariaInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type="email"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        placeholder={placeholder ?? "you@example.com"}
        autoComplete={autoComplete ?? "email"}
        required={required ?? false}
      />
      {ariaInvalid && <FieldError errors={errors} />}
    </Field>
  );
};

export default EmailField;

type TProps = {
  label?: string;
  name: string;
  value: string;
  errors: Array<{ message?: string } | undefined>;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ariaInvalid: boolean;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

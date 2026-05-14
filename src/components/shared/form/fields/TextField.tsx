import { Field, FieldLabel } from "@/components/ui/field";
import FormFieldError from "../FormFieldError";
import FormInputField from "../FormInputField";

const TextField = (props: TProps) => {
  const { name, label, value, onBlur, onChange, errors, ariaInvalid, ...rest } = props;

  return (
    <Field data-invalid={ariaInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <FormInputField
        id={name}
        type="text"
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        {...rest}
      />
      <FormFieldError errors={errors} />
    </Field>
  );
};

export default TextField;

type TProps = React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  name: string;
  value: string;
  errors: Array<{ message?: string } | undefined>;
  ariaInvalid: boolean;
};

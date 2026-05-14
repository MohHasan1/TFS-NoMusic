import { Field } from "@/components/ui/field";

const FormFooterContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Field orientation="responsive" className="space-y-3">
      {children}
    </Field>
  );
};

export default FormFooterContainer;

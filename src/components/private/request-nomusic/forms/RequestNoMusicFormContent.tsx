import { REQUEST_NOMUSIC_CLIENT, REQUEST_NOMUSIC_CONST } from "#constants/private/request-nomusic";
import type { TRequestNoMusicSchema } from "#validations/private/request-nomusic";
import TextField from "#components/shared/form/fields/TextField";
import { FieldGroup } from "#components/ui/field";
import type { TForm } from "#types/form";

const RequestNoMusicFormContent = ({ form, isSubmitting, clearMessagesFn }: TProps) => {
  return (
    <form
      id={REQUEST_NOMUSIC_CONST.FORM_ID}
      onSubmit={(e) => {
        e.preventDefault();
        void form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="url">
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <TextField
                label={REQUEST_NOMUSIC_CLIENT.URL_LBL}
                placeholder={REQUEST_NOMUSIC_CLIENT.URL_PLACEHOLDER}
                name={field.name}
                ariaInvalid={isInvalid}
                value={field.state.value}
                onBlur={field.handleBlur}
                errors={field.state.meta.errors}
                onChange={(e) => {
                  clearMessagesFn?.();
                  field.handleChange(e.target.value);
                }}
                disabled={isSubmitting}
              />
            );
          }}
        </form.Field>
      </FieldGroup>
    </form>
  );
};

export default RequestNoMusicFormContent;

type TProps = {
  form: TForm<TRequestNoMusicSchema>;
  isSubmitting: boolean;
  clearMessagesFn?: () => void;
};

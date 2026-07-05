import FormShell from "#components/shared/form/containers/FormShell";
import { RequestNoMusicForm } from "../forms/RequestNoMusicForm";

const RequestNomusicSection = () => {
  return (
    <FormShell className="py-2 sm:py-4">
      <RequestNoMusicForm />
    </FormShell>
  );
};

export default RequestNomusicSection;

import FormShell from "#components/shared/form/containers/FormShell";
import { RequestNoMusicForm } from "../forms/RequestNoMusicForm";

const RequestNomusicSection = () => {
  return (
    <FormShell className="py-24">
      <RequestNoMusicForm />
    </FormShell>
  );
};

export default RequestNomusicSection;

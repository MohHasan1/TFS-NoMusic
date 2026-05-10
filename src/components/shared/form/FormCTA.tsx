import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormCTA = ({ label, linkLabel, href }: TProps) => {
  return (
    <div className="flex items-center justify-between gap-3 pt-1 text-xs text-white/50">
      <span>{label}</span>

      <Button render={<Link href={href} />} nativeButton={false} variant="ghost" size="xs">
        {linkLabel}
      </Button>
    </div>
  );
};

export default FormCTA;

type TProps = {
  href: string;
  label: string;
  linkLabel: string;
};

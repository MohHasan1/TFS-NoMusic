import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormCTA = ({ text, linkText, href }: TProps) => {
  return (
    <div className="flex items-center justify-between gap-3 pt-1 text-xs text-white/50">
      <span>{text}</span>

      <Button render={<Link href={href} />} nativeButton={false} variant="ghost" size="xs">
        {linkText}
      </Button>
    </div>
  );
};

export default FormCTA;

type TProps = {
  text: string;
  linkText: string;
  href: string;
};

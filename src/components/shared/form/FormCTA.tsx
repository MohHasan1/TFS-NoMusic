import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormCTA = ({ label, linkLabel, isSubmitting, href, onClick }: TProps) => {
  return (
    <div className="flex items-center justify-between gap-3 pt-3 text-xs">
      <span className="text-muted-foreground ">{label}</span>

      <Button
        type={href ? undefined : "button"}
        render={href ? <Link href={href} /> : undefined}
        onClick={onClick}
        disabled={isSubmitting}
        nativeButton={href ? false : true}
        variant="link"
        size="xs"
        className={"text-primary-400"}
      >
        {linkLabel}
      </Button>
    </div>
  );
};

export default FormCTA;

type TBaseProps = {
  label: string;
  linkLabel: string;
  isSubmitting: boolean;
};

type TWithHref = TBaseProps & {
  href: string;
  onClick?: never;
};

type TWithOnClick = TBaseProps & {
  onClick: () => void;
  href?: never;
};

type TProps = TWithHref | TWithOnClick;

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const FormCard = ({ title, description, children, content, footer }: TProps) => {
  return (
    <Card className="w-full sm:max-w-md space-y-5 rounded-4xl bg-white/3 py-6 px-0 sm:px-0.5">
      <CardHeader className="space-y-0.5">
        <CardTitle className="text-xl text-primary-200 capitalize">{title}</CardTitle>
        <CardDescription className="text-xs tracking-wide">{description}</CardDescription>
      </CardHeader>
      {content && <CardContent>{content ?? children}</CardContent>}
      {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
    </Card>
  );
};

export default FormCard;

type TProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

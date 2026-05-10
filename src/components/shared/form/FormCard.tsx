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
    <Card className="w-full sm:max-w-md space-y-5 rounded-2xl bg-white/3 py-6">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content ?? children}</CardContent>
      <CardFooter className="pt-4">{footer}</CardFooter>
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

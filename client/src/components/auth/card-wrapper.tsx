import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  headerTitle: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref: string;
  heroImage?: string;
};

export const CardWrapper = (props: CardWrapperProps) => {
  const { heroImage, headerTitle, headerDescription, backButtonLabel, backButtonHref, children, ...rest } = props;

  return (
    <Card {...rest} className="mx-4 w-[400px] shadow md:mx-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      <Separator />
      <CardFooter className="py-3">
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
          <Link to={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
